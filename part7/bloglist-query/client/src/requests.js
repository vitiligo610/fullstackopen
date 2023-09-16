import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null
let config

export const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { authorization: token }
  }
}

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

export const create = blogObject =>
  axios.post(baseUrl, blogObject, config).then(res => res.data)

export const update = blogObject =>
  axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config).then(res => res.data)

export const remove = blogObject =>
  axios.delete(`${baseUrl}/${blogObject.id}`, config).then(res => res.data)

export const login = ({ username, password }) =>
  axios.post('/api/login', { username, password }).then(res => res.data)