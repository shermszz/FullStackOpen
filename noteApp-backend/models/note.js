const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
//This is different from frontend where we do export default Note for e.g.
//Node.js uses CommonJS syntax - which uses require() and module.exports
//if we did require('/models/notes'), we are importing whatever statement we exported,
//which in this case is mongoose.model('Note', noteSchema)
