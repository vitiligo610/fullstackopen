const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 600*600 })

  response
    .status(201)
    .json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter