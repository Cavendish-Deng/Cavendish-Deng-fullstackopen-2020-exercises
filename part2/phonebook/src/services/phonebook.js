import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (newObj) => {
    const request = axios.post(baseUrl, newObj)
    return request.then(res => res.data)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (id, replaceObj) => {
    const request = axios.put(`${baseUrl}/${id}`, replaceObj)
    return request.then(res => res.data)
}

export default {
    getAll,
    create,
    remove,
    update
}