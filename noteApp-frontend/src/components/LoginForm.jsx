import { useState } from 'react'

const LoginForm = ({ login }) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()
    login({ //Pass the credentials only
      username: username,
      password: password,
    })
    setUsername('')
    setPassword('')
  }
  
  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={loginUser}>
        <div>
          username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm