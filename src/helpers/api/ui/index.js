import {
    get,
    post,
    del,
    put
} from '..'


const getAdminAPI = () => get('http://localhost:8080/admin')
const cambiarPasswordAPI = (data) => put(`http://localhost:8080/password/`, data)

export {
    cambiarPasswordAPI,
    getAdminAPI
}