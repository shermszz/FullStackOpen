const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true //Ex4.12
  },
  author: String,
  url: {
    type: String,
    required: true //Ex4.12
  },
  likes: {
    type: Number,
    default: 0 //This is for Ex4.11
  }
}) //Defines how the blog objects are to be stored in the database

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)