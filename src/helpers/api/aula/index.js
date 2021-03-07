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
const getAulaFilesAPI = () => get('http://localhost:8080/aulaFiles')
const deleteFileAPI = (id, data) => del(`http://localhost:8080/deleteFile/${id}`, data)
const guardarMaterialAPI = obj => post('http://localhost:8080/guardarMaterial', obj)


export {
getAulaAPI,
addAulaAPI,
getAulaAlumnosAPI,
deleteAulaAPI,
putAulaAPI,
getAulaFilesAPI,
deleteFileAPI,
guardarMaterialAPI
}