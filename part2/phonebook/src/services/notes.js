import axios from 'axios'
const baseUrl = '/api/persons'

/* const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
} */

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response)
  }

const deleteIt = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
  }

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteIt: deleteIt, 
}

//export default { getAll, create, update }