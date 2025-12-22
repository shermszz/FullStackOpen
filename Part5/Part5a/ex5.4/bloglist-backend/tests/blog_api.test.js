const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const api = supertest(app)

describe('Part 4, Blog Table Unit Tests', () => {
  let token = null
  beforeEach(async () => { //Use this method to always reset the test database to an consistent initial state
    await Blog.deleteMany({}) //Clear the database first
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

    //Login with the first user to get the Token
    const firstUser = helper.initialUsers[0]
    const loginResponse = await api.post('/api/login')
      .send({
        username: firstUser.username,
        password: firstUser.password
      })
    token = loginResponse.body.token

    //Set all the blogs to be created by this first user only
    const userInDb = await User.findOne({ username: firstUser.username })

    const blogObjects = helper.initialBlogs.map(b => {
      return new Blog({ ...b, user: userInDb._id })
    })
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
  })

  test('Ex4.8: Blog List Tests, step 1', async () => {
    //Testing the HTTP GET request to the /api/blogs URL.
    const blogsAtStart = helper.initialBlogs
    //console.log("blogs at the start is:", blogsAtStart)
    const result = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/) //Verifying it is correctly in the JSON format
    //console.log("Result body is: ", result.body) //This one will automatically have an extra id field inside, cannot use deepStrictEqual to check for content equality

    assert.strictEqual(blogsAtStart.length, result.body.length)
  })

  test('Ex4.9: Blog List Tests, step 2', async () => {
    //Testing if the unique identifier property of blogs post is named "id", instead of the database default of "_id"
    const response = await api.get('/api/blogs')
    //console.log("Response body object looks like:", response.body)
    const firstBlog = response.body[0]
    //console.log("First blog id value", firstBlog.id)
    assert(firstBlog.id) //This must be defined, to show that the id field exists
    assert.strictEqual(firstBlog._id, undefined) //Additionally, this must be undefined to show that the _id does not exist
  })

  test('Ex4.10: Blog List Tests, step 3', async() => {
    //Testing to make sure adding a new post updates properly in the database by comparing the number of documents before and after
    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    //console.log("blogs after adding:", blogsAfterAdding)
    assert.strictEqual(helper.initialBlogs.length + 1, blogsAfterAdding.length)

    const titles = blogsAfterAdding.map(b => b.title)
    assert(titles.includes('React patterns'))
  })

  test('Ex4.11 Blog List Tests, step 4', async () => {
    //Testing to check if we add a blog with no likes field, it will default to 0
    const blogsAtStart = await helper.blogsInDb()
    const blogWithNoLikes = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      //MISSING LIKES FIELD
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    assert.strictEqual(blogsAtStart.length + 1, blogsAfterAdding.length) //Checking if it actually got posted

    assert.strictEqual(response.body.likes, 0)
  })

  describe('Ex4.12 Blog List Tests, step 5', () => {
    //Testing to check if title / url are missingm must send a 400 bad request back
    test('No title', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const noTitle = {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 101231
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noTitle)
        .expect(400)

      const blogsAfterFailure = await helper.blogsInDb()
      assert.strictEqual(blogsAfterFailure.length, blogsAtStart.length)
    })

    test('No url' , async() => {
      const blogsAtStart = await helper.blogsInDb()
      const noUrl = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 677777
      }

      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noUrl)
        .expect(400)

      const blogsAfterFailure = await helper.blogsInDb()
      assert.strictEqual(blogsAfterFailure.length, blogsAtStart.length)
    })

    test('No title and No url', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const noTitleAndUrl = {
        author: 'Joker',
        likes: 7
      }
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(noTitleAndUrl)
        .expect(400)
      const blogsAfterFailure = await helper.blogsInDb()
      assert.strictEqual(blogsAfterFailure.length, blogsAtStart.length)
    })
  })

  describe('Ex4.13 and Ex4.14 test cases', () => {
    test('4.13: Deleting a single blog post resource that exists', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      //Check the document length did indeed decrease by 1
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      //Check the title from the blog we deleted no longer exists
      const blogTitles = blogsAtEnd.map(b => b.title)
      assert(!blogTitles.includes(blogToDelete.title))
    })

    test('4.13: Trying to delete a post that does not exist', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const nonExistentBlogId = new mongoose.Types.ObjectId().toString() //Creates a fake valid 24-char hexadecimal string
      await api.delete(`/api/blogs/${nonExistentBlogId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      //Check the document length remains the same
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    })

    test('4.14: Updating the information of an individual blog post', async() => {
      const blogsAtStart= await helper.blogsInDb()
      let blogToUpdate = blogsAtStart[0]
      const oldLikes = blogToUpdate.likes
      blogToUpdate.likes += 10 //the update is here
      const response = await api.put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
      assert.strictEqual(oldLikes + 10, response.body.likes)
    })

    test('4.14: Trying to update a post that does not exist', async() => {
      const blogsAtStart = await helper.blogsInDb()
      const nonExistentBlogId = new mongoose.Types.ObjectId().toString() //Creates a fake valid 24-char hexadecimal string
      await api.put(`/api/blogs/${nonExistentBlogId}`)
        .expect(404)

      //Check the document length remains the same
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

    })
  })

  describe('Ex4.17', () => {
    test('Ex4.17: creation of a new blog should update the user\'s blog array ', async () => {
      const usersAtStart = await helper.usersInDb()
      const firstUserStart = usersAtStart[0]

      const newBlog = {
        title: 'CS2102',
        author: 'Voldermot',
        url: 'https://nusmods.com/courses/CS2102/database-systems',
        likes: 10,
        user: firstUserStart.id
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const firstUserEnd = await User.findById(firstUserStart.id)
      assert.strictEqual(firstUserEnd.blogs.length, firstUserStart.blogs.length + 1) //Length of the blogs array for firstUser should be increased by 1

      //Check also the ID of the blog is inside the array
      const blogIdsOfUser = firstUserEnd.blogs.map(x => x.toString())
      assert(blogIdsOfUser.includes(response.body.id))
    })
  })

  describe('Posting Blogs with Token Authentication', () => {

    test('Ex4.19: Succesful addition of blog if token is valid', async () => {
      const newBlog = {
        title: 'Authentication check',
        author: 'me',
        url: 'www.url.com',
        likes: 9
      }

      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token}`) //Ex4.23
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes('Authentication check'))
    })

    test('Ex4.19: Testing failure if token is missing', async () => { //Ex4.23
      const newBlog = {
        title: 'Authentication fails',
        author: 'me',
        url: 'www.url.com',
        likes: 9
      }
      const response = await api.post('/api/blogs')
        //We do not set the authorization header with the login token here
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      assert.match(response.body.error, /Invalid user or Missing token/)

      //Ensure the state of the database did not change
      const blogsAtEnd = await helper.blogsInDb()
      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes('Authentication fails'))
    })
  })

  describe('Deleting Blogs', () => {
    test('Ex4.21: Deleting an existing blog with creater\'s credential works', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
      await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)

      //Check to make sure the title does not exist inside the database anymore
      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('Ex4.21: Deleting a blog that does not belong to the user should throw 401 Unauthorized error', async () => {
      //Login the 2nd user in initial blogs
      const secondUser = helper.initialUsers[1]
      const loginResponse = await api.post('/api/login')
        .send(secondUser)
      const secondUserToken = loginResponse.body.token
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${secondUserToken}`)
        .expect(401)

      //Ensure the error message shows the error body message given when an unauthorized user tries to delete someone else's blog
      assert.match(response.body.error, /Unauthorized deletion, only creator can delete their own blog/)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})