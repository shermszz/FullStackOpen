const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('Testing the User database', async () => {
  beforeEach(async() => {
    await User.deleteMany({}) //Delete all the users inside first to ensure consistent state on every test run
    for (const user of helper.initialUsers) { //Since initialUsers contains their raw plain passwords, we need to hash it
      //Manually hash their passwords first
      const passwordHash = await bcrypt.hash(user.password, 10)
      const userObject = new User({ //Then create the mongoose object using the User constructor
        username: user.username,
        name: user.name,
        passwordHash: passwordHash
      })
      await userObject.save() //Then save the new Mongoose object into MongoDB
    }
  })

  test('Ex4.15: Testing the GET method, if all users are retrieved properly', async () => {
    const usersAtStart = await helper.usersInDb()
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(usersAtStart.length, response.body.length)
  })

  test('Ex4.15: Testing if successfully created new user', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToAdd = {
      username: 'testing POST request',
      name: 'ex4.15',
      password: 'test1'
    }
    await api.post('/api/users')
      .send(userToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length + 1, usersAtEnd.length)

    const usernames = usersAtEnd.map(x => x.username)
    assert(usernames.includes(userToAdd.username))
  })
})

after(async () => {
  await mongoose.connection.close()
})