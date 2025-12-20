const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) //So that the note is revealed (only the username and name), rather then just the noteID
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({}) //Just find the first user in the User Table

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id //Always assigning the new blog posted to the first user in the User Table
  })

  const addedBlog = await newBlog.save() //Saving the newBlog into the Blog Table

  user.blogs = user.blogs.concat(addedBlog._id) //At the same time, we update the user and add this newBlog into this user's blogs array
  await user.save() //Ensure the changes are saved inside the User database

  response.status(201).json(addedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  //Need to search for the blog first with said :id
  //Then, we delete it from the database
  const blogToDelete = await Blog.findByIdAndDelete(request.params.id)
  if (!blogToDelete) {
    return response.status(404).end() //The blog we want to delete is not found in the database
  }
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

