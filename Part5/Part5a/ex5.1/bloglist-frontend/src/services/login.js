import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials) //has token, username and name
  return response.data
}

export default { login }