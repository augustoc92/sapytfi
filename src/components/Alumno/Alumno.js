import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table, InputNumber, Space, Tooltip, Dropdown, Menu } from 'antd';
import styles from './Alumno.module.css'
import { map, omit } from 'lodash'
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';


class Alumno extends React.Component{

    componentDidMount() {
        const { getAlumno, getCarrera } = this.props

        getCarrera();
        getAlumno();
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        carreraDelAlumno: {},
        errorMessage: ''
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            errorMessage: ''
        });
        if(document.getElementById('nombreAlumno')) {
            document.getElementById('nombreAlumno').value = '';
            document.getElementById('emailAlumno').value = '';
            document.getElementById('dniAlumno').value = '';
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
        const { carrera, selectedRow } = this.props;
        const carreraDelAlumno = carrera.filter((carrier => carrier.id === selectedRow[0].carrera));

        this.setState({
            carreraDelAlumno: carreraDelAlumno[0],
            visibleModificar: true,
        });
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleOkAgregar = e => {
        const { addAlumno } = this.props;
        let nombre = document.getElementById('nombreAlumno').value;
        let email = document.getElementById('emailAlumno').value;
        let dni = document.getElementById('dniAlumno').value;
        let carrera = this.state.carreraDelAlumno;

        let objToAdd = {
            nombre,
            dni,
            email,
            id_carrera: carrera.id
        }

        const mails = this.props.data.map(x => x.email)
        const dnis = this.props.data.map(x => x.dni)


        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreAlumno').focus();
            return ;
        }
        if (mails.indexOf(email) > -1 ) {
            this.setState({
                errorMessage: 'Este mail ya esta en uso'
            })
            document.getElementById('emailAlumno').focus();
            return ;
        } else if(!this.validateEmail(email)) {
            this.setState({
                errorMessage: 'Ingrese un email valido'
            })
            document.getElementById('emailAlumno').focus();
            return ;
        }
        if (dnis.indexOf(dni) > -1 ){
            this.setState({
                errorMessage: 'Este DNI ya esta en uso'
            });
            document.getElementById('dniAlumno').focus();
            return ;
        } else if(!/^\d+$/.test(dni)) {
            this.setState({
                errorMessage: 'Ingrese un DNI correcto'
            });
            return;
        }

        addAlumno(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putAlumno, selectedRow } = this.props;
        let nombre = document.getElementById('nombreModificar').value;
        let email = document.getElementById('emailModificar').value;
        let dni = document.getElementById('dniModificar').value;
        let carrera = this.state.carreraDelAlumno;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre,
            dni,
            email,
            id_carrera: carrera.id
        }

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
        if (dnis.indexOf(dni) > -1 ){
            this.setState({
                errorMessage: 'Este DNI ya esta en uso'
            });
            document.getElementById('dniModificar').focus();
            return ;
        }  else if(!/^\d+$/.test(dni)) {
            this.setState({
                errorMessage: 'Ingrese un DNI correcto'
            });
            return;
        }

        putAlumno(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteAlumno, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteAlumno(selectedRow[0].id);
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

    createMenu = () => {
        const { carrera } = this.props

        return (
            <Menu onClick={this.handleMenuClick}>
            {carrera.map(x =>
                <Menu.Item key={x.id} onClick={() => {this.agregarCarreraAlumno(x)}}> {x.nombre} </Menu.Item>
            )
            }
            </Menu>
        )
    };

    agregarCarreraAlumno = (carreraToAdd) => {
        this.setState({
            carreraDelAlumno: carreraToAdd
        })
    }

    createKeys(data) {
        const { carrera } = this.props
        const newArray = data.map(x => {
            const carreraDelAlumno = carrera.filter((carrier => carrier.id === x.carrera));
            const carreraNombre = carreraDelAlumno && carreraDelAlumno[0] && carreraDelAlumno[0].nombre
            return (
                {
                    ...x,
                    carreraNombre,
                    key: x.id
                }
            )
        })
        return newArray;
    }

    render() {
        const { data, cols, addMateria, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar, carreraDelAlumno, errorMessage } = this.state;

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
                        <label for="nombreAlumno">Nombre (de 4 a 30 caracteres):</label>
                        <Input
                            id="nombreAlumno"
                            maxLength="30"
                        />
                        <label for="emailAlumno">Email (de 4 a 30 caracteres):</label>
                        <Input
                            id="emailAlumno"
                            maxLength="30"
                        />
                        <label for="dniAlumno">DNI</label>
                        <Input
                            id="dniAlumno"
                            maxLength="8"
                        />
                        <br></br>
                        <label> Carrera del alumno </label>
                        <Space>
                            <Dropdown overlay={this.createMenu()}>
                            <Button>
                                {carreraDelAlumno.nombre || "Seleccione una carrera"} <DownOutlined />
                            </Button>
                            </Dropdown>
                        </Space>
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
                                <Input
                                    id="dniModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].dni}
                                    maxLength="8"
                                />
                                <br></br>
                                <label> Carrera del alumno </label>
                                <Space>
                                    <Dropdown overlay={this.createMenu()}>
                                    <Button>
                                        {carreraDelAlumno.nombre || "Seleccione una carrera"} <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                            <br></br>
                            { errorMessage &&
                                <label className={styles.errorMessage}> {errorMessage} </label>
                            }
                            </React.Fragment>
                            ||
                            <div> Seleccione una Alumno para modificar </div>
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
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar al Alumno {selectedRow[0].nombre} </div> ||
                            <div> Seleccione una Alumno </div>
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
        title: 'Nombre Carrera',
        dataIndex: 'carreraNombre',
    },
    {
        title: 'DNI',
        dataIndex: 'dni',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.dni - b.dni,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.email.length - b.email.length,
    }
];

export default Alumno;

