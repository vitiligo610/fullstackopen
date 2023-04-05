import axios from 'axios'
const baseUrl = 'https://2mwyu2-3001.csb.app/api/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then((response) => response.data)
}

const createPerson = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const deletePerson = (id) => {
    const del = axios.delete(`${baseUrl}/${id}`)
    return del.then((response) => response.data)
}

export default { getAll, createPerson, updatePerson, deletePerson }
