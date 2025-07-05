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

//Ex4.5
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let storedBlog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > storedBlog.likes) {
      storedBlog = blogs[i]
    }
  }
  return storedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}