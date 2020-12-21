import { reject } from 'ramda'
import {
    GET_PROFESOR_PENDING,
    GET_PROFESOR_FULFILLED,
    GET_PROFESORMATERIA_FULFILLED,
    GET_PROFESOR_REJECTED,
    UPDATE_PROFESOR_FULLFILED,
    UPDATE_PROFESOR_REJETED,
    ADD_PROFESOR_FULLFILED,
    ADD_PROFESOR_REJECTED,
    REMOVE_PROFESOR_FULFILLED,
    REMOVE_PROFESOR_REJECTED
} from './const'


import { getProfesorAPI, addProfesorAPI, deleteProfesorAPI, putProfesorAPI } from '../../../helpers/api/profesor';


export const getProfesor = () => (dispatch) => {
    getProfesorAPI()
        .then(result =>
            dispatch({
                type: GET_PROFESOR_FULFILLED,
                payload: {
                    result
                }
            })
        )
}

export const addProfesor = obj => (dispatch) => {
    addProfesorAPI(obj)
        .then(idmax =>
            dispatch({
                type: ADD_PROFESOR_FULLFILED,
                payload: {
                    obj,
                    idmax
                }
            })
        )
}

export const guardarExamen = obj => (dispatch) => {
    addProfesorAPI(obj)
        .then(idmax =>
            dispatch({
                type: ADD_PROFESOR_FULLFILED,
                payload: {
                    obj,
                    idmax
                }
            })
        )
}

export const putProfesor = (id, obj) => (dispatch) => {
    putProfesorAPI(id, obj)
        .then(res =>
            dispatch({
                type: UPDATE_PROFESOR_FULLFILED,
                payload: {
                    id,
                    obj,
                    res
                }
            })
        )
}

export const deleteProfesor = id => (dispatch) => {
    deleteProfesorAPI(id)
        .then(res =>
            dispatch({
                type: REMOVE_PROFESOR_FULFILLED,
                payload: {
                    id
                }
            })
        )
}

const ModelObj = [
    {
        key: '1',
        nombre: 'Matematica 1',
        duracion: 40,
        lugar: 'Rosario',
    },
    {
        key: '2',
        nombre: 'Quimica',
        duracion: 15,
        lugar: 'San Nicolas',
    },
    {
        key: '3',
        nombre: 'Fisica 1',
        duracion: 32,
        lugar: 'Rosario',
    },
    {
        key: '4',
        nombre: 'SAP',
        duracion: 32,
        lugar: 'San Nicolas',
    },
];


const dataObj = [
    {
        key: '1',
        nombre: 'Ingeneria',
        materias: 40,
        planDeEstudio: 'T108',
    },
    {
        key: '2',
        nombre: 'Profesorado',
        materias: 15,
        planDeEstudio: 'T109',
    },
    {
        key: '3',
        nombre: 'Abogacia',
        materias: 32,
        planDeEstudio: 'IC03',
    },
    {
        key: '4',
        nombre: 'Mecanica',
        materias: 32,
        planDeEstudio: 'P03',
    },
];
