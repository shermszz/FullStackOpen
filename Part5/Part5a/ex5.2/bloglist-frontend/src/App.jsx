import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userExists = window.localStorage.getItem('loggedIn')
    if (userExists) {
      const loggedInUser = JSON.parse(userExists)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const updateUsername = event => setUsername(event.target.value)
  const updatePassword = event => setPassword(event.target.value)

  const handleLogin = async event => {
    event.preventDefault() //prevents a reload
    console.log('Logging in...')
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedIn', JSON.stringify(user))
      setUser(user) //Contains token, username, name in one payload
      console.log('Successfully logged in!')
      setUsername('')
      setPassword('')
    } catch {
      console.log('Wrong Credentials')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedIn')
    setUser(null)
  }

  const loadBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
         <p> 
          {user.name} logged in 
          <button onClick={handleLogOut}> logout </button> 
         </p> 
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    )
  }

  const showLoginPage = () => {
    return (
      <div>
        <h2> log in to application </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username <input type="text" value={username} onChange={updateUsername}/>
            </label>
          </div>
          <div>
            <label>
              password <input type="password" value={password} onChange={updatePassword}/> 
              {/* type="password" makes the password text become black dots */}
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      {!user && showLoginPage()}
      {user && loadBlogs()}
    </div>
  )
}

export default App