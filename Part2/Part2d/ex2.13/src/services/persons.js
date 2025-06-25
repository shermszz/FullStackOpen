import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

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

export default {
  getAll,
  create,
  update,
}