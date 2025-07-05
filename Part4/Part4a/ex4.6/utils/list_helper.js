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

//Ex4.6 (Using HashMaps)
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const arrayWithAuthorsOnly = blogs.map(blog => blog.author)

  const authorCount = {} //Creating an empty HashMap first

  for (let i = 0; i < arrayWithAuthorsOnly.length; i++) {
    const author = arrayWithAuthorsOnly[i]
    if (authorCount[author]) { //If the key already exist
      authorCount[author]++  //Increment the value
    } else {
      authorCount[author] = 1 //Set to default value of 1 and add into HashMap
    }
  }

  let count = 0
  let topAuthor = ''
  for (let author in authorCount) {
    if (authorCount[author] > count) {
      count = authorCount[author]
      topAuthor = author
    }
  }

  return {
    author: topAuthor,
    blogs: count
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}