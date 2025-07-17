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

describe('Exercise 4.12 Test Cases', () => {
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

  test('Like property missing default to 0 value', async () => {
    const blogWithNoLikes = {
      title: 'Zero Likes',
      author: 'Helsinki',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend'
    }

    const response = await api
      .post('/api/blogs')
      .send(blogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log('Number of likes in this blog is: ',response.body.likes)
    assert.strictEqual(response.body.likes, 0)
  })

  test('Verifying if blog with no title or url returns 400 Bad Request', async () => {
    const blogWithNoTitle = {
      author: 'Helsinki',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      likes: 1
    }
    const blogWithNoUrl = {
      title: 'No URL',
      author: 'Helsinki',
      likes: 1
    }
    const response = await api
      .post('/api/blogs')
      .send(blogWithNoTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const response2 = await api
      .post('/api/blogs')
      .send(blogWithNoUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    console.log('Error message for no title is: ', response.body.error)
    console.log('Error message for no URL is: ', response2.body.error)

    assert.strictEqual(response.body.error, 'Blog validation failed: title: Title is required')
    assert.strictEqual(response2.body.error, 'Blog validation failed: url: URL is required')
  })
})

after(async () => {
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
})