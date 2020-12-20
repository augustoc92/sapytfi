import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table } from 'antd';
import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import styles from './Carrera.module.css'
import { map, omit } from 'lodash'
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

class Carrera extends React.Component{

    componentDidMount() {
        const { getCarrera, getMateriasXCarrera, getMateria } = this.props
        getCarrera()
        getMateriasXCarrera()
        getMateria()
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        materias: []
    }

    clearModals = () => {
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            materias: []
        });
        if(document.getElementById('nombreCarrera')) {
            document.getElementById('nombreCarrera').value = '';
            document.getElementById('planDeEstudio').value = '';
            document.getElementById('lugarCarrera').value = '';
            document.getElementById('duracionCarrera').value = '';
        }
        if(document.getElementById('nombreCarreraModificar')) {
            document.getElementById('nombreCarreraModificar').value = '';
            document.getElementById('planDeEstudioModificar').value = '';
            document.getElementById('lugarCarreraModificar').value = '';
            document.getElementById('duracionCarreraModificar').value = '';
        }
    }

    handleMenuClick = (e) => {
        message.info('Materia Agregada');
    }

    createMenu = () => {
        const { materias } = this.props

        return (
            <Menu onClick={this.handleMenuClick}>
            {materias.map(x =>
                <Menu.Item key={x.id} onClick={() => this.addMateriaToArray(x)}> {x.nombre} </Menu.Item>
            )
            }
            </Menu>
        )
    };

    addMateriaToArray = (materia) => {
        const { materias } = this.state;

        this.setState({
            ...this.state,
            materias: [...materias, materia]
        })
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
        const { selectedRow, materiasCarrera, materias } = this.props
        if (selectedRow && selectedRow[0]) {
            const idsMateriasDeLaCarrera = materiasCarrera.filter(x => {
                return x.id_carrera === selectedRow[0].id.toString()
            }).map(x => x.id_materia);

            const materiasDeLaMateria = materias.filter(x => idsMateriasDeLaCarrera.includes(x.id.toString()));

            this.setState({
                visibleModificar: true,
                materias: materiasDeLaMateria
            });
        }
    }

    removeMateriaFromArray = (id) => {
        const { materias } = this.state;
        const filteredItems = materias.filter(mat => mat.id !== id);

        this.setState({
            materias: [...filteredItems]
        })

    }

    renderMaterias = () => {
        const { materias } = this.state;

        return (
            materias.map(materia => {
                console.log('materia render', materia);
                return (
                    <Button key={materia.id} type="text" onClick={() => this.removeMateriaFromArray(materia.id)}>
                        {materia.nombre}
                        <span className={styles.eraseIcon}>
                            <DeleteOutlined />
                        </span>
                    </Button>
                )
            })
        )
    }

    handleOkAgregar = e => {
        const { addCarrera } = this.props;
        const { materias } = this.state;

        let nombre = document.getElementById('nombreCarrera').value;
        let plan = document.getElementById('planDeEstudio').value;
        let lugarCarrera = document.getElementById('lugarCarrera').value;
        let duracion = document.getElementById('duracionCarrera').value;


        let objToAdd = {
            nombre,
            lugarCarrera,
            plan,
            duracion,
            materias
        }

        addCarrera(objToAdd);
        this.clearModals();
    }


    handleOkModificar = e => {
        const { putCarrera, selectedRow } = this.props;
        const { materias } = this.state;
        let nombre = document.getElementById('nombreCarreraModificar').value;
        let plan = document.getElementById('planDeEstudioModificar').value;
        let lugarCarrera = document.getElementById('lugarCarreraModificar').value;
        let duracion = document.getElementById('duracionCarreraModificar').value;

        const idToSend = selectedRow[0].id

        let objToAdd = {
            nombre,
            lugarCarrera,
            plan,
            duracion,
            materias
        }

        putCarrera(idToSend, objToAdd);
        this.clearModals();
    }

    handleOkEliminar = e => {
        const { selectedRow, deleteCarrera, selectRow } = this.props;
        if (selectedRow && selectedRow[0]) {
            deleteCarrera(selectedRow[0].id);
            selectRow(null);
        }

        this.clearModals();
    }


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
        const newArray = data && data.map(x => {
            return (
                {
                    ...x,
                    key: x.id
                }
            )
        })
        return newArray || [];
    }

    render() {
        const { data, cols, selectedRow } = this.props;
        const { visibleAgregar, visibleEliminar, visibleModificar } = this.state;
        const tableData = this.createKeys(data);
        const hasSelectedRow = selectedRow && !!selectedRow[0]

        return(
            <div>
                <NavBar />
                    <Table
                        rowSelection={{
                            type: "radio",
                            ...this.rowSelection,
                        }}
                        columns={columns}
                        dataSource={tableData}
                        onChange={this.onChange}
                    />
                  {/* AGREGAR */}
                <Modal
                    visible={visibleAgregar}
                    onOk={this.handleOkAgregar}
                    onCancel={this.handleCancel}
                >
                    <div className={styles.formContainer}>
                        <label for="nombreCarrera">Nombre (de 4 a 25 caracteres)</label>
                        <Input
                            id="nombreCarrera"
                            maxLength="25"
                        />
                        <label for="planDeEstudio">Plan de estudio (de 4 a 25 caracteres)</label>
                        <Input
                            id="planDeEstudio"
                            maxLength="25"
                        />
                        <label for="lugarCarrera">Lugar</label>
                        <Input
                            id="lugarCarrera"
                            maxLength="8"
                        />
                        <label for="duracionCarrera">Duracion</label>
                        <Input
                            id="duracionCarrera"
                            maxLength="12"
                        />
                        <br></br>
                        <Space>
                            <Dropdown overlay={this.createMenu()}>
                            <Button>
                                Agregar Materias <DownOutlined />
                            </Button>
                            </Dropdown>
                        </Space>
                        <div className={styles.materiasContainer}>
                            { this.renderMaterias() }
                        </div>
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
                                <label for="nombreCarreraModificar">Nombre (de 4 a 12 caracteres)</label>
                                <Input
                                    id="nombreCarreraModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].nombre}
                                    maxLength="12"
                                />
                                <label for="planDeEstudioModificar">Plan de estudio (de 4 a 12 caracteres)</label>
                                <Input
                                    id="planDeEstudioModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].plan_de_estudio}
                                    maxLength="12"
                                />
                                <label for="lugarCarreraModificar">Lugar</label>
                                <Input
                                    id="lugarCarreraModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].lugar}
                                    maxLength="8"
                                />
                                <label for="duracionCarreraModificar">Duracion</label>
                                <Input
                                    id="duracionCarreraModificar"
                                    defaultValue={selectedRow[0] && selectedRow[0].duracion}
                                    maxLength="12"
                                />
                                <br></br>
                                <Space wrap>
                                    <Dropdown overlay={this.createMenu()}>
                                    <Button>
                                        Agregar Materias <DownOutlined />
                                    </Button>
                                    </Dropdown>
                                </Space>
                                <div className={styles.materiasContainer}>
                                    { this.renderMaterias() }
                                </div>
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
                            selectedRow && selectedRow[0] && <div> Esta seguro que desea eliminar la carrera {selectedRow[0].nombre} </div> ||
                            <div> Seleccione una carrera </div>
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
        title: 'Nombre',
        dataIndex: 'nombre'
    },
    {
        title: 'Lugar',
        dataIndex: 'lugar',
        sorter: (a, b) => a.lugar.length - b.lugar.length,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Plan de estudio',
        dataIndex: 'plan_de_estudio',
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Duracion en años',
        dataIndex: 'duracion',
        sorter: (a, b) => a.duracion > b.duracion,
        sortDirections: ['descend', 'ascend'],
    },
];

export default Carrera;
