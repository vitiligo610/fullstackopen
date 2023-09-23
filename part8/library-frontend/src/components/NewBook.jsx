import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_BOOKS, ALL_AUTHORS, ADD_BOOK } from '../queries'

import { updateCache } from '../App'

const NewBook = ({ setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    onError: error => {
      const msg = error.graphQLErrors[0].message
      setNotification(`ERROR ${msg}`)
    },
    // refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      updateCache(cache, { query: ALL_BOOKS }, response.data.addBook)
      
      const cachedAuthors = cache.readQuery({ query: ALL_AUTHORS })
      if (cachedAuthors) {
        cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
          return {
            allAuthors: [...new Set(allAuthors.concat(response.data.addBook.author))]
          }
        })
      }

      genres.forEach(genre => {
        const cachedQuery = cache.readQuery({ query: ALL_BOOKS, variables: { genre }})
        if (cachedQuery)
          updateCache(cache, { query: ALL_BOOKS, variables: { genre }}, response.data.addBook)
      })
    }

  })

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published, genres: genres.filter(g => g !== '') }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>Add new</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook