const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
	const blog = await Blog.findById(id)
	if (blog) {
		response.status(200).json(blog)
	} else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
  let { title, author, url, likes } = request.body
	
  if (!title || !author || !url) {
    return response.status(400).json({ error: 'content missing' })
  }

	if (!likes) {
		likes = 0
	}

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes
  })

	await blog.save()
	response.status(201).json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
	const { title, author, url, likes } = request.body
	const id = request.params.id

	const blog = {
		title: title,
		author: author,
		url: url,
		likes: likes
	}

	const updatedNote = await Blog.findByIdAndUpdate(id, blog, { new: true })
	response.status(200).json(updatedNote)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
	await Blog.findByIdAndRemove(id)
	response.status(204).end()
})

module.exports = blogsRouter
