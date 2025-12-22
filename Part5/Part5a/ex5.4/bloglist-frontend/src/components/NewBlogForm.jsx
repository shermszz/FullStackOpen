import { useState } from 'react'
import Notification from './Notification'

const NewBlogForm = ( {createNewBlog} ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)

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
  }

  return (
    <div>
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
      </form>
    </div>
  )
}

export default NewBlogForm