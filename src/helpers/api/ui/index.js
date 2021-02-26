import {
    get,
    post,
    del,
    put
} from '..'

const cambiarPasswordAPI = (data) => put(`http://localhost:8080/password/`, data)

export {
    cambiarPasswordAPI
}