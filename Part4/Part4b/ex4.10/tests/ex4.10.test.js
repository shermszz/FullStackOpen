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

describe('Exercise 4.10 Test Cases', () => {
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

  test('Verifying unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogToView = response.body[0]

    assert.strictEqual('id' in blogToView, true)
    assert.strictEqual('_id' in blogToView, false)
  })

  test('Verifying making POST request is successful', async () => {
    const validBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(validBlog) //To attach the request body to the POST request
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('Type wars'))
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
})