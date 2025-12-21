const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body //Users will key in their username and password here
  const user = await User.findOne({ username }) //Find the user whose username === request.body.username
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return response.status(401).json({ error: 'Invalid username or password' }) //return unauthorized response
  }

  // if user exists and the password is correct, we generate a token
  const userForToken = { //This object consists of fields that will be inside the token when we decode it later on
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter