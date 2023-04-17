const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog.findById(id)
    .then(blog => {
      if (blog) {
        response.status(200).json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response) => {
  const { title, author, url, likes } = request.body
  if (!title || !author || !url) {
    response.status(400).json({ error: 'content missing' })
  }

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

blogRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end
    })
    .catch(error => next(error))
})
