const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://shermszz:${password}@part4.fcf9ubh.mongodb.net/blogApp?appName=Part4`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) //Defines how the blog objects are to be stored in the database

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 3) {
  //Only gave node mongo.js <password>, then we display all entries in the phonebook
  Blog.find({}).then(result => {
    console.log('Blog App: ')
    result.forEach(b => {
      console.log(b.title, b.author, b.url, b.likes)
    })
    mongoose.connection.close()
  })
} else {
  //There should be a name and number included as the next 2 arguments
  const newTitle = process.argv[3]
  const newAuthor = process.argv[4]
  const newUrl = process.argv[5]
  const setLikes = process.argv[6]
  const newBlog = new Blog({
    title: newTitle,
    author: newAuthor,
    urlL: newUrl,
    likes: setLikes
  })
  newBlog.save().then(() => {
    console.log(`added a new blog whose title is ${newTitle} and author is ${newAuthor}, can be found at ${newUrl} and currently has ${setLikes} likes`)
    mongoose.connection.close()
  })
}