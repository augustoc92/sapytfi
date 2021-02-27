import React from 'react';
import NavBar from '../Shared/NavBar';
import { Modal, Button, Input, Table } from 'antd';
import { Menu, Dropdown, message, Space, Tooltip } from 'antd';
import styles from './Carrera.module.css'
import { map, omit, differenceBy } from 'lodash'
import { DownOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';

class Carrera extends React.Component{

    componentDidMount() {
        const { getCarrera, getMateriaXCarrera, getMateria } = this.props
        getCarrera()
        getMateriaXCarrera()
        getMateria()
    }

    state = {
        visibleAgregar: false,
        visibleEliminar: false,
        visibleModificar: false,
        nombreCarrera: '',
        planCarrera: '',
        lugarCarrera: '',
        duracionCarrera: '',
        errorMessage: '',
        materias: []
    }

    clearModals = () => {
        const { selectRow } = this.props;
        this.setState({
            visibleAgregar: false,
            visibleEliminar: false,
            visibleModificar: false,
            errorMessage: '',
            nombreCarrera: '',
            planCarrera: '',
            lugarCarrera: '',
            duracionCarrera: '',
            materias: []
        });
        selectRow(null);
    }

    handleMenuClick = (e) => {
        message.info('Materia Agregada');
    }

    createMenu = () => {
        const { materias } = this.props
        const materiaState = this.state.materias

        const myDifferences = differenceBy(materias, materiaState, 'nombre')


        return (
            <Menu onClick={this.handleMenuClick}>
            {myDifferences.map(x =>
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
        this.clearModals();
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
        const { selectedRow, materiasCarrera, materias } = this.props;

        if (selectedRow && selectedRow[0]) {
            const idsMateriasDeLaCarrera = materiasCarrera.filter(x => {
                return x.id_carrera === selectedRow[0].id.toString()
            }).map(x => x.id_materia);


            const materiasDeLaCarrera = materias.filter(x => idsMateriasDeLaCarrera.includes(x.id.toString()));
            const { nombre, lugar, plan_de_estudio, duracion } = selectedRow[0];

            this.setState({
                visibleModificar: true,
                nombreCarrera: nombre,
                planCarrera: plan_de_estudio,
                lugarCarrera: lugar,
                duracionCarrera: duracion,
                materias: materiasDeLaCarrera
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
        const { addCarrera, getCarrera, getMateria, getMateriaXCarrera } = this.props;
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

        const planes = this.props.data.map(x => x.plan_de_estudio)

        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreCarrera').focus();
            return ;
        }
        if (!plan) {
            this.setState({
                errorMessage: 'Ingrese un plan'
            })
            document.getElementById('planDeEstudio').focus();
            return ;
        }

        if (planes.indexOf(plan) > -1) {
            this.setState({
                errorMessage: 'Ya existe una carrera con este plan'
            })
            document.getElementById('planDeEstudio').focus();
            return ;
        }

        if (!lugarCarrera) {
            this.setState({
                errorMessage: 'Ingrese un lugar'
            })
            document.getElementById('lugarCarrera').focus();
            return ;
        }

        if (!duracion) {
            this.setState({
                errorMessage: 'Ingrese la duracion'
            })
            document.getElementById('duracionCarrera').focus();
            return ;
        }
        if (!materias.length > 0){
            this.setState({
                errorMessage: 'Seleccione las materias de la carrera'
            });
            return ;
        }

        addCarrera(objToAdd);
        this.clearModals();
    }

    handleNameChange = val => {
        this.setState({
            nombreCarrera: val
        })
    }
    handlePlanChange = val => {
        this.setState({
            planCarrera: val
        })
    }
    handleLugarChange = val => {
        this.setState({
            lugarCarrera: val
        })
    }
    handleDuracionChange = val => {
        const res = val.replace(/\D/g, "");
        this.setState({
            duracionCarrera: res
        })
    }

    handleOkModificar = e => {
        const { putCarrera, selectedRow } = this.props;
        const { getCarrera, getMateria, getMateriaXCarrera } = this.props;
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

        const planes = this.props.data.filter(x => x.plan_de_estudio !== selectedRow[0].plan_de_estudio).map(x => x.plan_de_estudio)

        if (!nombre) {
            this.setState({
                errorMessage: 'Ingrese un nombre'
            })
            document.getElementById('nombreCarreraModificar').focus();
            return ;
        }
        if (!plan) {
            this.setState({
                errorMessage: 'Ingrese un plan'
            })
            document.getElementById('planDeEstudioModificar').focus();
            return ;
        }
        if (planes.indexOf(plan) > -1) {
            this.setState({
                errorMessage: 'Ya existe una carrera con este plan'
            })
            document.getElementById('planDeEstudioModificar').focus();
            return ;
        }

        if (!lugarCarrera) {
            this.setState({
                errorMessage: 'Ingrese un lugar'
            })
            document.getElementById('lugarCarreraModificar').focus();
            return ;
        }

        if (!duracion) {
            this.setState({
                errorMessage: 'Ingrese la duracion'
            })
            document.getElementById('duracionCarreraModificar').focus();
            return ;
        }
        if (!materias.length > 0){
            this.setState({
                errorMessage: 'Seleccione las materias de la carrera'
            });
            return ;
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
        const { visibleAgregar, visibleEliminar, visibleModificar, errorMessage,
        nombreCarrera, duracionCarrera, planCarrera, lugarCarrera } = this.state;
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
                        <label htmlFor="nombreCarrera">Nombre (de 4 a 25 caracteres)</label>
                        <Input
                            id="nombreCarrera"
                            value={nombreCarrera}
                            onChange={(e) => this.handleNameChange(e.target.value)}
                            maxLength="25"
                        />
                        <label htmlFor="planDeEstudio">Plan de estudio (de 4 a 25 caracteres)</label>
                        <Input
                            id="planDeEstudio"
                            value={planCarrera}
                            onChange={(e) => this.handlePlanChange(e.target.value)}
                            maxLength="25"
                        />
                        <label htmlFor="lugarCarrera">Lugar</label>
                        <Input
                            id="lugarCarrera"
                            value={lugarCarrera}
                            onChange={(e) => this.handleLugarChange(e.target.value)}
                            maxLength="8"
                        />
                        <label htmlFor="duracionCarrera">Duracion</label>
                        <Input
                            id="duracionCarrera"
                            value={duracionCarrera}
                            onChange={(e) => this.handleDuracionChange(e.target.value)}
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
                                <label htmlFor="nombreCarreraModificar">Nombre (de 4 a 20 caracteres)</label>
                                <Input
                                    id="nombreCarreraModificar"
                                    value={nombreCarrera}
                                    onChange={(e) => this.handleNameChange(e.target.value)}
                                    maxLength="20"
                                />
                                <label htmlFor="planDeEstudioModificar">Plan de estudio (de 4 a 12 caracteres)</label>
                                <Input
                                    id="planDeEstudioModificar"
                                    value={planCarrera}
                                    onChange={(e) => this.handlePlanChange(e.target.value)}
                                    maxLength="12"
                                />
                                <label htmlFor="lugarCarreraModificar">Lugar</label>
                                <Input
                                    id="lugarCarreraModificar"
                                    value={lugarCarrera}
                                    onChange={(e) => this.handleLugarChange(e.target.value)}
                                    maxLength="8"
                                />
                                <label htmlFor="duracionCarreraModificar">Duracion</label>
                                <Input
                                    id="duracionCarreraModificar"
                                    value={duracionCarrera}
                                    onChange={(e) => this.handleDuracionChange(e.target.value)}
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
                                <br></br>
                                { errorMessage &&
                                    <label className={styles.errorMessage}> {errorMessage} </label>
                                }
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
