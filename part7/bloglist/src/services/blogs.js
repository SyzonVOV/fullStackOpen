import axios from 'axios'
const baseUrl = 'http://localhost:3005/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log(content);
  const response = await axios.post(baseUrl, content)
  return response.data
}

const api = { getAll, createNew }

export default api