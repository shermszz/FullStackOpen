const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('Part 4: User Table Unit Tests', () => {
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
  describe('Ex4.15', () => {
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

  describe('Ex4.16', () => {
    test('Ex4.16: username with < 3 characters returns 400 Validation error', async () => {
      const usernameLessThan3Characters = {
        username:'aa',
        name:'I have less than 2 characters in my username',
        password:'haha'
      }
      await api.post('/api/users')
        .send(usernameLessThan3Characters)
        .expect(400)
    })

    test('Ex4.16: password < 3 characters should throw 400 Bad Request', async () => {
      const shortPassword = {
        username:'Testing Password',
        name:'I have less than 2 characters in my password',
        password:'aa'
      }
      const response = await api.post('/api/users')
        .send(shortPassword)
        .expect(400)

      assert.match(response.body.error , /password must be at least 3 characters long/)
    })

    test('Ex4.16: Password not given should return 400 Bad Request', async () => {
      const noPassword = {
        username:'I have no password',
        name: 'no password',
        //EMPTY PASSWORD
      }

      const response = await api.post('/api/users')
        .send(noPassword)
        .expect(400)

      assert.match(response.body.error, /password must be given/)
    })

    test('Ex4.16: Non-unique usernames should throw 400 validation errors', async () => {
      const usersAtStart = await helper.usersInDb()
      const existingUsername = usersAtStart[0].username

      const duplicateUsername = {
        username: existingUsername,
        name:'I am a copy',
        password:'copy'
      }

      const response = await api.post('/api/users')
        .send(duplicateUsername)
        .expect(400)
      //Assert to ensure the 400 return is a result of non-unique username
      assert.match(response.body.error, /expected `username` to be unique/)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})