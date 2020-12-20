import { reject } from 'ramda'
import {
    GET_CARRERA_PENDING,
    GET_CARRERA_FULFILLED,
    GET_CARRERAMATERIA_FULFILLED,
    GET_CARRERA_REJECTED,
    UPDATE_CARRERA_FULLFILED,
    UPDATE_CARRERA_REJETED,
    ADD_CARRERA_FULLFILED,
    ADD_CARRERA_REJECTED,
    REMOVE_CARRERA_FULFILLED,
    REMOVE_CARRERA_REJECTED
} from './const'


import { getCarreraAPI, getCarreraMateriaAPI, addCarerraAPI, deleteCarreraAPI, putCarreraAPI } from '../../../helpers/api/carrera';


export const getCarrera = () => (dispatch) => {
    getCarreraAPI()
        .then(result =>
            dispatch({
                type: GET_CARRERA_FULFILLED,
                payload: {
                    result
                }
            })
        )
}

export const getMateriasXCarrera = () => (dispatch) => {
    getCarreraMateriaAPI()
        .then(result =>
            dispatch({
                type: GET_CARRERAMATERIA_FULFILLED,
                payload: {
                    result
                }
            })
        )
}


export const addCarrera = obj => (dispatch) => {
    addCarerraAPI(obj)
        .then(idmax =>
            dispatch({
                type: ADD_CARRERA_FULLFILED,
                payload: {
                    obj,
                    idmax
                }
            })
        )
}

export const putCarrera = (id, obj) => (dispatch) => {
    putCarreraAPI(id, obj)
        .then(res =>
            dispatch({
                type: UPDATE_CARRERA_FULLFILED,
                payload: {
                    id,
                    obj
                }
            })
        )
}

export const deleteCarrera = id => (dispatch) => {
    console.log('id', id)
    deleteCarreraAPI(id)
        .then(res =>
            dispatch({
                type: REMOVE_CARRERA_FULFILLED,
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
