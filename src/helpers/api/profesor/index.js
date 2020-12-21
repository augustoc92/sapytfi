import {
    get,
    post,
    del,
    put
} from '..'

const getProfesorAPI = () => get('http://localhost:8080/profesors')
const addProfesorAPI = data => post('http://localhost:8080/profesors', data)
const deleteProfesorAPI = id => del(`http://localhost:8080/profesors/${id}`)
const putProfesorAPI = (id, data) => put(`http://localhost:8080/profesors/${id}`, data)

export {
getProfesorAPI,
addProfesorAPI,
deleteProfesorAPI,
putProfesorAPI
}