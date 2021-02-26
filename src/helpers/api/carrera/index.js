import {
    get,
    post,
    del,
    put
} from '..'

const getCarreraAPI = () => get('http://localhost:8080/carreras')
const getMateriaXCarreraAPI = () => get('http://localhost:8080/materiaXCarrera')
const getAlumnoXCarreraAPI = () => get('http://localhost:8080/alumnoXCarrera')
const addCarerraAPI = data => post('http://localhost:8080/carreras', data)
const deleteCarreraAPI = id => del(`http://localhost:8080/carreras/${id}`)
const putCarreraAPI = (id, data) => put(`http://localhost:8080/carreras/${id}`, data)

export {
getCarreraAPI,
addCarerraAPI,
deleteCarreraAPI,
getMateriaXCarreraAPI,
getAlumnoXCarreraAPI,
putCarreraAPI
}