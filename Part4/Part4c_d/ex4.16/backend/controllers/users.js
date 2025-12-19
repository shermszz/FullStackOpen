const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
  //Creating a new user and store this new user appropriately in the database
  const { username, name, password } = request.body

  //Ex4.16: Need to manually check the password here, since the mongoose Schema only records the hashed version
  if (!password) return response.status(400).json({ error: 'password must be given' })
  else if (password.length < 3) {
    return response.status(400).json({ error: 'password must be at least 3 characters long' })
  }

  //First, we hash this users password
  const passwordHash = await bcrypt.hash(password, 10) //Use the standard 10 saltrounds

  //Then, we create a new user for the mongoose database
  const newUser = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)

})


module.exports = usersRouter