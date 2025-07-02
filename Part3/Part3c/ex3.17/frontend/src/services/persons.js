import axios from 'axios'
const baseUrl = '/api/people'

const getAll = () => {
    return axios.get(baseUrl)
                .then(response => response.data)
}

const create = (personObject) => {
    return axios.post(baseUrl, personObject)
                .then(response => response.data)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
                .then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove
}