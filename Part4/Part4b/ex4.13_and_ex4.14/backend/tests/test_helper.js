const Blog = require('../models/blog')

let initialBlogs = [
  {
    title: 'Single Source Shortest Path',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}) //find({}) returns a promise object, and await will wait for this to resolve
  return blogs.map(b => b.toJSON())
}

module.exports = {
  blogsInDb,
  initialBlogs
}