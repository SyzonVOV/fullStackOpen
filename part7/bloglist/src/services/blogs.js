import axios from 'axios'
const baseUrl = '/api/blogs/';

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, content, config);
  return response.data;
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(baseUrl+updatedObject.id, { likes: updatedObject.likes }, config);
  return response.data;
};

const api = { getAll, createNew, setToken, update }

export default api