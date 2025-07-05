//Ex4.3
const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : 1
}

//Ex4.4
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}