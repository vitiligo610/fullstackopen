const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password) {
    return response.status(400).json({ error: 'password cannot be left empty' })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save().catch(error => response.status(400).json({ error: error.message }))
  response.status(201).json(savedUser)
})

module.exports = usersRouter