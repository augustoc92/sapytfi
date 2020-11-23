import React from 'react';
import NavBar from '../Shared/NavBar';
import CRUDTable from '../Shared/CRUDTable';
import { Button } from 'antd';
import styles from './Carrera.module.css'

class Carrera extends React.Component{

    componentDidMount() {
        const { getCarrera } = this.props
        getCarrera()
    }

    render() {
        const { data, cols } = this.props;

        console.log('this.props carreara', this.props)

        return(
            <div>
                <NavBar />
                <CRUDTable
                    columns={columns}
                    data={data}
                    objToHandle='Carrera'
                />
            </div>
        )
    }
}

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Materias',
        dataIndex: 'materias',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.duracion - b.duracion,
    },
    {
        title: 'planDeEstudio',
        dataIndex: 'planDeEstudio',
        sorter: (a, b) => a.lugar.length - b.lugar.length,
        sortDirections: ['descend', 'ascend'],
    },
];

export default Carrera;

