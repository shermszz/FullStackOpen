import { useState } from 'react'

const NewBlogForm = ( {createNewBlog} ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [makeBlogVisible, setBlogVisibility] = useState(false)

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

  const hideBlogs = { display: makeBlogVisible ? 'none' : '' }
  const showBlogs = { display: makeBlogVisible ? '' : 'none' }

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    createNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogVisibility(false) //After creating a new valid blog, hide the form
  }

  return (
    <div>
      {/*Hidden form with a 'create new blog' button */}
      <div style={hideBlogs}>
        <button onClick={() => setBlogVisibility(true)}> create new blog </button>
      </div>
      {/*After clicking the 'create new blog' button, show the fields to fill up */}
      <div style={showBlogs}>
        <h2> create new </h2>
        <form onSubmit={addBlog}>
          <div>
            <label>
              title: <input type="text" value={title} onChange={handleTitleChange}/>
            </label>
          </div>
          <div>
            <label>
              author: <input type="text" value={author} onChange={handleAuthorChange}/>
            </label>
          </div>
          <div>
            <label>
              url: <input type="text" value={url} onChange={handleUrlChange}/>
            </label>
          </div>
          <button type="submit">create</button>
          <br/>
          <button type="button" onClick={() => setBlogVisibility(false)}>cancel</button>
        </form>
      </div>
    </div>
  )
}

export default NewBlogForm