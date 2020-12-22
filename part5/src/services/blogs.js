import axios from 'axios';
const baseUrl = '/api/blogs/';

let token = null;
const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(baseUrl+updatedObject.id, { likes: updatedObject.likes }, config);
  return response.data;
};

const deleteBlog = async deleteObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(baseUrl+deleteObject, config);
  return response.data;
};

const exp = {
  getAll,
  create,
  update,
  deleteBlog,
  setToken
};

export default exp;