const Blog = require('../models/blog')
const User = require('../models/user')

let initialBlogs = [
  {
    title: 'Single Source Shortest Path',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'Data Structures and Algorithms',
    author: 'Steven Halim',
    url: 'https://nusmods.com/courses/CS2040S/data-structures-and-algorithms',
    likes: 100
  }
]

let initialUsers = [
  {
    username: 'root',
    name: 'for token generation',
    password: 'secret1'
  },
  {
    username: '2nd user',
    name: 'for deletion purposes',
    password: 'secret2'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({}) //find({}) returns a promise object, and await will wait for this to resolve
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  blogsInDb,
  initialBlogs,
  usersInDb,
  initialUsers
}