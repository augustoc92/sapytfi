import {
    get,
    post,
    del,
    put
} from '..'

const getAulaAPI = () => get('http://localhost:8080/aula')
const getAulaAlumnosAPI = () => get('http://localhost:8080/aulaalumno')
const addAulaAPI = data => post('http://localhost:8080/aula', data)
const deleteAulaAPI = id => del(`http://localhost:8080/aula/${id}`)
const putAulaAPI = (id, data) => put(`http://localhost:8080/aula/${id}`, data)

export {
getAulaAPI,
addAulaAPI,
getAulaAlumnosAPI,
deleteAulaAPI,
putAulaAPI
}