const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
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
  let { title, author, url, likes, userId } = request.body
  
  if (!title || !author || !url) {
    return response.status(400).json({ error: 'content missing' })
  }

  if (!likes) {
    likes = 0
  }

  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const id = request.params.id

  const blog = {
    title,
    author,
    url,
    likes
  }

  await Blog.findByIdAndUpdate(id, blog, { new: true })
  response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(id)

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized action' })
  }
})

module.exports = blogsRouter