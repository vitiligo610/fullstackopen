import axios from 'axios'
import { config } from './services/blogs'

const baseUrl = 'http://localhost:3001/api/blogs'

export const getAll = () =>
  axios.get(baseUrl).then(res => res.data)

export const create = blogObject =>
  axios.post(baseUrl, blogObject, config).then(res => res.data)