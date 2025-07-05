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

//Ex4.7
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const map = {} //Key is author, Value is the likes

  const listOfAuthorsWithLikes = blogs.map(blog => {
    const numOfLikes = blog.likes
    const author = blog.author
    return {
      key: author,
      value: numOfLikes
    }
  })

  for (let i = 0; i < listOfAuthorsWithLikes.length; i++) {
    const name = listOfAuthorsWithLikes[i].key
    map[name] = (map[name] || 0) + listOfAuthorsWithLikes[i].value
  }

  //Once map is created, return the one whose value / numOfLikes is highest.
  let topLikes = 0
  let associatedAuthor = ''
  for (let author in map) {
    if (map[author] > topLikes) {
      topLikes = map[author] //Get the max value = getting the max number of likes
      associatedAuthor = author
    }
  }

  return {
    author: associatedAuthor,
    likes: topLikes
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}