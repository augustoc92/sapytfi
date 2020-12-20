import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table } from 'antd';
import styles from './Subject.module.css'
import { map, omit } from 'lodash'

class Subject extends React.Component{

    componentDidMount() {
        const { getMateria } = this.props

        getMateria()
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false
        });
        if(document.getElementById('nombreMateria')) {
            document.getElementById('nombreMateria').value = '';
            document.getElementById('duracionMateria').value = '';
        }
        if(document.getElementById('nombreModificar')) {
            document.getElementById('nombreModificar').value = '';
            document.getElementById('duracionModificar').value = '';
        }
    }

    handleCancel = e => {
        this.clearModals()
    };

    handleVisibleAgregar = e => {
        this.setState({
            visibleAgregar: true,
        });
    };

    handleVisibleEliminar = e => {
        this.setState({
            visibleEliminar: true,
        });
    };

    handleVisibleModificar = e => {
        this.setState({
            visibleModificar: true,
        });
    }

    handleOkAgregar = e => {
        const { addMateria } = this.props;
        let nombre = document.getElementById('nombreMateria').value;
        let horas_catedra = document.getElementById('duracionMateria').value;

        let objToAdd = {
            nombre,
            horas_catedra
        }

        addMateria(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putMateria, selectedRow } = this.props;
        let nombre = document.getElementById('nombreModificar').value;
        let horas_catedra = document.getElementById('duracionModificar').value;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre,
            horas_catedra
        }

        putMateria(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteMateria, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteMateria(selectedRow[0].id);
            selectRow(null);
        }

        this.clearModals();
    }


    onChange =  (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    rowSelection = {
        onChange: (selectedRowKeys, selectedRow) => {
            const { selectRow } = this.props;
            selectRow(selectedRow)
        },
        getCheckboxProps: record => ({
            disabled: record.nombre === 'No configurada', // Column configuration not to be checked
            name: record.nobmre,
        }),
    };

    createKeys(data) {
        const newArray = data.map(x => {
            return (
                {
                    ...x,
                    key: x.id
                }
            )
        })
        return newArray;
    }

    render() {
        const { data, cols, addMateria, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar } = this.state;

        const tableData = this.createKeys(data);

        const hasSelectedRow = selectedRow && !!selectedRow[0]


        return(
            <div>
                <NavBar />
                {data &&
                    <Table
                        rowSelection={{
                            type: "radio",
                            ...this.rowSelection,
                        }}
                        columns={columns}
                        dataSource={tableData}
                        onChange={this.onChange}
                    />
                }
                {/* AGREGAR */}
                <Modal
                    visible={visibleAgregar}
                    onOk={this.handleOkAgregar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        <label for="nombreMateria">Nombre (de 4 a 12 caracteres):</label>
                        <Input
                            id="nombreMateria"
                            maxLength="12"
                        />
                        <label for="duracionMateria">Duracion</label>
                        <Input
                            id="duracionMateria"
                            maxLength="8"
                        />
                    </div>
                </Modal>
                {/* MODIFICAR */}
                <Modal
                    visible={visibleModificar}
                    onOk={this.handleOkModificar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        {console.log(selectedRow)}
                        { selectedRow && selectedRow[0]
                            &&
                            <React.Fragment>
                                <label for="nombreModificar">Nombre (de 4 a 12 caracteres):</label>
                                <Input
                                    id="nombreModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre}
                                    maxLength="30"
                                />
                                <label for="duracionModificar">Duracion</label>
                                <Input
                                    id="duracionModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].horas_catedra}
                                    maxLength="8"
                                />
                            </React.Fragment>
                            ||
                            <div> Seleccione una materia para modificar </div>
                        }
                    </div>
                </Modal>
                {/* ELIMINAR */}
                <Modal
                    visible={visibleEliminar}
                    onOk={this.handleOkEliminar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        {
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar la materia {selectedRow[0].nombre} </div> ||
                            <div> Seleccione una materia </div>
                        }

                    </div>
                </Modal>
                <div className={styles.buttonContainer}>
                    <Button
                        type="primary"
                        onClick={() => this.handleVisibleAgregar()}>
                            Agregar
                    </Button>
                    <Button
                        type="primary"
                        disabled={!hasSelectedRow}
                        onClick={() => this.handleVisibleModificar()}>
                            Modificar
                    </Button>
                    <Button
                        type="primary"
                        disabled={!hasSelectedRow}
                        onClick={() => this.handleVisibleEliminar()}>
                            Eliminar
                    </Button>
                </div>
            </div>
        )
    }
}


const columns = [
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Duracion en horas',
        dataIndex: 'horas_catedra',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.horas_catedra - b.horas_catedra,
    }
];

export default Subject;

