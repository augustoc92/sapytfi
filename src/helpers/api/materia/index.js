import {
    get,
    post,
    del,
    put
} from '..'

const getMateriaAPI = () => get('http://localhost:8080/materias')
const adddMateriaAPI = data => post('http://localhost:8080/materias', data)
const deleteMateriaAPI = id => del(`http://localhost:8080/materias/${id}`)
const putMateriaAPI = (id, data) => put(`http://localhost:8080/materias/${id}`, data)

export {
getMateriaAPI,
adddMateriaAPI,
deleteMateriaAPI,
putMateriaAPI
}