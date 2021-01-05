import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, InputNumber, Table } from 'antd';
import styles from './Profesor.module.css'
import { map, omit } from 'lodash'

class Profesor extends React.Component{

    componentDidMount() {
        const { getProfesor } = this.props

        getProfesor()
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
        if(document.getElementById('nombreProfesor')) {
            document.getElementById('nombreProfesor').value = '';
            document.getElementById('emailProfesor').value = '';
            document.getElementById('emailProfesor').value = '';
        }
        if(document.getElementById('nombreModificar')) {
            document.getElementById('nombreModificar').value = '';
            document.getElementById('emailModificar').value = '';
            document.getElementById('dniModificar').value = '';
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
        const { addProfesor } = this.props;
        let nombre = document.getElementById('nombreProfesor').value;
        let email = document.getElementById('emailProfesor').value;
        let DNI = document.getElementById('dniProfesor').value;

        let objToAdd = {
            nombre,
            email,
            DNI
        }

        addProfesor(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putProfesor, selectedRow } = this.props;
        let nombre = document.getElementById('nombreModificar').value;
        let email = document.getElementById('emailModificar').value;
        let DNI = document.getElementById('dniModificar').value;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre,
            email,
            DNI
        }

        putProfesor(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteProfesor, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteProfesor(selectedRow[0].id);
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
                        <label for="nombreProfesor">Nombre (de 4 a 30 caracteres):</label>
                        <Input
                            id="nombreProfesor"
                            maxLength="30"
                        />
                        <label for="emailProfesor">Email (de 4 a 30 caracteres):</label>
                        <Input
                            id="emailProfesor"
                            maxLength="30"
                        />
                        <label for="dniProfesor">DNI</label>
                        <InputNumber
                            id="dniProfesor"
                            max={99999999}
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
                        { selectedRow && selectedRow[0]
                            &&
                            <React.Fragment>
                                <label for="nombreModificar">Nombre (de 4 a 30 caracteres):</label>
                                <Input
                                    id="nombreModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre}
                                    maxLength="30"
                                />
                                <label for="emailModificar">Email (de 4 a 30 caracteres):</label>
                                <Input
                                    id="emailModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].email}
                                    maxLength="30"
                                />
                                <label for="dniModificar">DNI</label>
                                <InputNumber
                                    id="dniModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].dni}
                                    max={99999999}
                                />
                            </React.Fragment>
                            ||
                            <div> Seleccione una profesor para modificar </div>
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
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar el profesor {selectedRow[0].nombre} </div> ||
                            <div> Seleccione un profesor </div>
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
        title: 'DNI',
        dataIndex: 'dni',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.dni - b.dni,
    },
    {
        title: 'EMAIL',
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.email.length - b.email.length,
    }
];

export default Profesor;

