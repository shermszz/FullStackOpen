const Blog = require('../models/blog')

const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const listOfBlogs = await Blog.find({})
  return response.json(listOfBlogs)
})

//Refactored to use async / await
blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    const savedNote = await blog.save()
    return response.status(201).json(savedNote)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter