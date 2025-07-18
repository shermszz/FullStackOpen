const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'] //Custom error messages for validation
  },
  author: String,
  url: {
    type: String,
    required: [true, 'URL is required'] //Custom error messages for validation
  },
  likes: {
    type: Number,
    default: 0 //If no likes are provided, default value is 0
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog