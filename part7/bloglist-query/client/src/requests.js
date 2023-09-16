import axios from 'axios'
import { config } from './services/blogs'

const baseUrl = '/api/blogs'

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

export const create = blogObject =>
  axios.post(baseUrl, blogObject, config).then(res => res.data)

export const update = blogObject =>
  axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config).then(res => res.data)

export const remove = blogObject =>
  axios.delete(`${baseUrl}/${blogObject.id}`, config).then(res => res.data)