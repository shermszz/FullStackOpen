const dummy = () => { //Ex4.3, dummy value that always returns 1
  return 1
}

const totalLikes = (blogs) => { //Ex4.4, function that returns the total sum of likes in all of the blog posts
  const listOfLikes = blogs.map(b => b.likes)
  return listOfLikes.reduce((sum, likes) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {//Ex4.5, returns the blog with the most number of likes
  const n = blogs.length
  if (n === 0) return null
  let maxLikes = 0 //This represents the count of the blogs with the most likes
  let id = 0 //The index of where the blog with the most likes is, the earliest one will be returned upon ties
  for (let i = 0; i < n; i++) {
    const currLikes = blogs[i].likes
    if (currLikes > maxLikes) {
      id = i
      maxLikes = currLikes
    }
  }
  return blogs[id]
}

const mostBlogs = (blogs) => { //Ex4.6, returns the author that posted the most number of blogs
  if (blogs.length === 0) return null
  const map = new Map() //Use a HashMap to record the number of blog posts made
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    map.set(author, (map.get(author) ?? 0) + 1) //If the author does not yet exist in the hashmap, set its count to 0
  }
  //Now, find the author with the max number of blog posts
  let maxAuthor = ''
  let numBlogs = 0
  for (const [key, value] of map) {
    if (value > numBlogs) {
      maxAuthor = key
      numBlogs = value
    }
  }
  return {
    author: maxAuthor,
    blogs: numBlogs
  }
}

const mostLikes = (blogs) => { //Ex4.7, returns the author that garnered the most likes
  if (blogs.length === 0) return null
  const map = new Map() //Use a HashMap to record the number of likes received by each author
  for (let i = 0; i < blogs.length; i++) {
    const author = blogs[i].author
    const likes = blogs[i].likes
    map.set(author, (map.get(author) ?? 0) + likes)
  }
  //Now, find the author with the max number of likes
  let maxAuthor = ''
  let numLikes = 0
  for (const [key, value] of map) {
    if (value > numLikes) {
      maxAuthor = key
      numLikes = value
    }
  }
  return {
    author: maxAuthor,
    likes: numLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}