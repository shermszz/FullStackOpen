import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  console.log("after successful login, the response.data contains", response.data)
  return response.data
  //response.data contains { token: ..., username: ..., name: ... } based on the backend
}

export default { login }