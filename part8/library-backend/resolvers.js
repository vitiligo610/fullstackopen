const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book')
const Author = require('./models/author')

const resolvers = {
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      const author = args.author
      const genre = args.genre
      if (author) {
        const author = await Author.find({ name: author })
        if (genre) {
          return Book.find({ author, genres: { $in: [genre] } }).populate(
            'author'
          )
        }
        return Book.find({ author }).populate('author')
      }
      if (genre) {
        return Book.find({ genres: { $in: [genre] } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: async (_, __, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genresWithDuplicates = books.map((b) => b.genres.map((g) => g)).flat()
      return [...new Set(genresWithDuplicates)]
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name })
      const booksByAuthor = await Book.find({ author })
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const foundAuthor = await Author.findOne({ name: args.author })

      if (!foundAuthor) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(
            'Author name should be atleast 4 characters long',
            {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.author,
                error
              }
            }
          )
        }
      }

      const author = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(
          'Book title should be atleast 5 characters long',
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          }
        )
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (_, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const name = args.name
      const author = await Author.findOne({ name })
      if (!name && !author) {
        return null
      }
      await Author.findOneAndUpdate({ name }, { born: args.setBornTo })
      return Author.findOne({ name })
    },
    createUser: async (_, args) => {
      const user = new User({ ...args })

      return user.save().catch((error) => {
        throw new GraphQLError('createing new user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      })
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        user: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

module.exports = resolvers