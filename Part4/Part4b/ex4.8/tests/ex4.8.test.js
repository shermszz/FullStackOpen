const assert = require('node:assert')
const { test, describe, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('Exercise 4.8 Test Cases', () => {
  test('Verifying if blog list application returns correct blog post in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Verifying if all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
})