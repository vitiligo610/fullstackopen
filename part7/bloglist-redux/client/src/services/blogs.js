import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async blogObject => {
  const request = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return request.data
}

const remove = async blogId => {
  const request = await axios.delete(`${baseUrl}/${blogId}`, config)
  return request.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setToken,
  getAll,
  create,
  update,
  remove
}