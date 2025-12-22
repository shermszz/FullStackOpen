const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

describe('Part 4, Login Table Unit Tests', () => {
  beforeEach( async () => {
    await User.deleteMany({}) //Clear the User table first
    //Create one valid user before running tests
    const passwordHash = await bcrypt.hash('secret', 10)
    const validUser = new User({
      username: 'root',
      name: 'I am valid',
      passwordHash
    })
    await validUser.save()
  })

  test('Ex4.18: Successful login with correct credentials', async () => {
    const user = {
      username: 'root',
      password: 'secret'
    }
    const result = await api.post('/api/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.username, 'root')
  })

  test('Ex4.18: Login with Wrong password should throw 401 Unauthorised error', async () => {
    const user = {
      username: 'root',
      password: 'wrongPassword'
    }
    const result = await api.post('/api/login')
      .send(user)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Invalid username or password'))
  })

  test('Ex4.18: Login with non-existent username should throw 401 Unauthorised error', async () => {
    const nonExistentUser = {
      username: 'I do not exist',
      password: 'secret'
    }
    const result = await api.post('/api/login')
      .send(nonExistentUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('Invalid username or password'))
  })
})

after(async () => {
  mongoose.connection.close()
})
