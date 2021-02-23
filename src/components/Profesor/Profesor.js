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
        visibleModificar: false,
        errorMessage: ''
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            errorMessage: ''
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

        const mails = this.props.data.map(x => x.email)
        const dnis = this.props.data.map(x => x.dni)

        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreProfesor').focus();
            return ;
        }
        if (mails.indexOf(email) > -1) {
            this.setState({
                errorMessage: 'Este mail ya esta en uso'
            })
            document.getElementById('emailProfesor').focus();
            return ;
        } else if(!this.validateEmail(email)) {
            this.setState({
                errorMessage: 'Ingrese un email valido'
            })
            document.getElementById('emailProfesor').focus();
            return ;
        }
        if (dnis.indexOf(DNI) > -1 ){
            this.setState({
                errorMessage: 'Este DNI ya esta en uso'
            });
            document.getElementById('dniProfesor').focus();
            return ;
        }  else if(!/^\d+$/.test(DNI)) {
            this.setState({
                errorMessage: 'Ingrese un DNI correcto'
            });
            document.getElementById('dniProfesor').focus();
            return;
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

        const mails = this.props.data.map(x => x.email)
        const dnis = this.props.data.map(x => x.dni)

        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreModificar').focus();
            return ;
        }
        if (mails.indexOf(email) > -1  && email !== selectedRow[0].email) {
            this.setState({
                errorMessage: 'Este mail ya esta en uso'
            })
            document.getElementById('emailModificar').focus();
            return ;
        } else if(!this.validateEmail(email)) {
            this.setState({
                errorMessage: 'Ingrese un email valido'
            })
            document.getElementById('emailModificar').focus();
            return ;
        }
        if (dnis.indexOf(DNI) > -1 ){
            this.setState({
                errorMessage: 'Este DNI ya esta en uso'
            });
            document.getElementById('dniModificar').focus();
            return ;
        }  else if(!/^\d+$/.test(DNI)) {
            this.setState({
                errorMessage: 'Ingrese un DNI correcto'
            });
            document.getElementById('dniModificar').focus();
            return;
        }

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

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        const { data, cols, addMateria, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar, errorMessage } = this.state;

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
                        <label htmlFor="nombreProfesor">Nombre (de 4 a 30 caracteres):</label>
                        <Input
                            id="nombreProfesor"
                            maxLength="30"
                        />
                        <label htmlFor="emailProfesor">Email (de 4 a 30 caracteres):</label>
                        <Input
                            id="emailProfesor"
                            maxLength="30"
                        />
                        <label htmlFor="dniProfesor">DNI</label>
                        <Input
                            id="dniProfesor"
                            maxLength={8}
                        />
                        <br></br>
                        { errorMessage &&
                            <label className={styles.errorMessage}> {errorMessage} </label>
                        }
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
                                <label htmlFor="nombreModificar">Nombre (de 4 a 30 caracteres):</label>
                                <Input
                                    id="nombreModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre}
                                    maxLength="30"
                                />
                                <label htmlFor="emailModificar">Email (de 4 a 30 caracteres):</label>
                                <Input
                                    id="emailModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].email}
                                    maxLength="30"
                                />
                                <label htmlFor="dniModificar">DNI</label>
                                <Input
                                    id="dniModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].dni}
                                    maxLength={8}
                                />
                                <br></br>
                                { errorMessage &&
                                    <label className={styles.errorMessage}> {errorMessage} </label>
                                }
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

