import {
    get,
    post,
    del,
    put
} from '..'

const getAlumnoAPI = () => get('http://localhost:8080/alumnos')
const addAlumnoAPI = data => post('http://localhost:8080/alumnos', data)
const deleteAlumnoAPI = id => del(`http://localhost:8080/alumnos/${id}`)
const putAlumnoAPI = (id, data) => put(`http://localhost:8080/alumnos/${id}`, data)

export {
getAlumnoAPI,
addAlumnoAPI,
deleteAlumnoAPI,
putAlumnoAPI
}