import {
    get,
    post,
    del,
    put
} from '..'

const getAlumnoAPI = () => get('http://localhost:8080/alumnos')
const addAlumnoAPI = data => post('http://localhost:8080/alumnos', data)
const deleteAlumnoAPI = (id, data) => del(`http://localhost:8080/alumnos/${id}`, data)
const putAlumnoAPI = (id, data) => put(`http://localhost:8080/alumnos/${id}`, data)
const tomarExamenAPI = data => post('http://localhost:8080/tomarExamen', data)
const getExamenesNotaAPI = () => get('http://localhost:8080/getExamenesNota')


export {
getAlumnoAPI,
addAlumnoAPI,
deleteAlumnoAPI,
putAlumnoAPI,
tomarExamenAPI,
getExamenesNotaAPI
}