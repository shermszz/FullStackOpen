const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => { //Refactored rute hanlder to use async/await for Ex4.8
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  //console.log("From the controllers folder, blog object is:", blog)

  const addedBlog = await blog.save()
  if (addedBlog) response.status(201).json(addedBlog)
  else response.status(400).end()
})

blogsRouter.delete('/:id', async (request, response) => { //Ex4.13
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

