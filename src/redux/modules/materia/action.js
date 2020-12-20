import { reject } from 'ramda'
import {
    GET_MATERIA_PENDING,
    GET_MATERIA_FULFILLED,
    GET_MATERIA_REJECTED,
    UPDATE_MATERIA_FULLFILED,
    UPDATE_MATERIA_REJETED,
    ADD_MATERIA_FULLFILED,
    ADD_MATERIA_REJECTED,
    REMOVE_MATERIA_FULFILLED,
    REMOVE_MATERIA_REJECTED
} from './const'

import { getMateriaAPI, adddMateriaAPI, deleteMateriaAPI, putMateriaAPI } from '../../../helpers/api/materia';


export const getMateria = () => (dispatch) => {
    getMateriaAPI()
        .then(result =>
            dispatch({
                type: GET_MATERIA_FULFILLED,
                payload: {
                    result
                }
            })
        )
}

export const addMateria = obj => (dispatch) => {
    adddMateriaAPI(obj)
        .then(idmax =>
            dispatch({
                type: ADD_MATERIA_FULLFILED,
                payload: {
                    obj,
                    idmax
                }
            })
        )
}

export const putMateria = (id, obj) => (dispatch) => {
    putMateriaAPI(id, obj)
        .then(res =>
            dispatch({
                type: UPDATE_MATERIA_FULLFILED,
                payload: {
                    id,
                    obj
                }
            })
        )
}

export const deleteMateria = id => (dispatch) => {
    deleteMateriaAPI(id)
        .then(res =>
            dispatch({
                type: REMOVE_MATERIA_FULFILLED,
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
