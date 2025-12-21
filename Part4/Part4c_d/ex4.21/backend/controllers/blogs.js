const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) //So that the note is revealed (only the username and name), rather then just the noteID
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET) //Could raise a JsonWebTokenError, handled by middleware
  const userId = decodedToken.id //Id of the user who is making the newBlog
  if (!userId) {
    //This is a safeguard check because the id field is not immutable in the token and could be changed next time
    //This just ensures we literally have the id field in place if we ever refactor our code from id to user_id for example
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(userId) //The actual user object with decodedToken.id

  if (!user) return response.status(401).json({ error: 'UserId missing or not valid' })

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id //Assign the newBlog to the this particular user
  })

  const addedBlog = await newBlog.save() //Saving the newBlog into the Blog Table

  user.blogs = user.blogs.concat(addedBlog._id) //At the same time, we update the user and add this newBlog into this user's blogs array
  await user.save() //Ensure the changes are saved inside the User database

  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  //First, check to make sure the token of the user is valid
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) return response.status(401).json({ error: 'Invalid token' })

  //Second, check that the id of the user actually exists
  const user = await User.findById(decodedToken.id)
  if (!user) return response.status(401).json({ error: 'Invalid user' })

  //Third, find the blog that he wants to delete and check that the blog actually exists
  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) return response.status(204).end() //204 instead of 404 for idempotency reasons

  //Now, check if the blog's user id matches the user id who requested the deletion
  //blogToDelete.user is the ObjectId(...), convert it into a string
  if (blogToDelete.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized deletion, only creator can delete their own blog' })
  }

  //Otherwise, we can carry out the deletion safely
  await Blog.findByIdAndDelete(request.params.id)
  user.blogs = user.blogs.filter(x => x.toString() !== request.params.id)
  await user.save() //Save the changes to the User table

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  //Serach for the blog that we want to update
  //If it exists, then update it to what the request body is
  let blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) return response.status(404).end()

  const { title, author, url, likes } = request.body
  blogToUpdate.title = title
  blogToUpdate.author = author
  blogToUpdate.url = url
  blogToUpdate.likes = likes

  const updatingBlog = await blogToUpdate.save()
  response.json(updatingBlog)
})

module.exports = blogsRouter

