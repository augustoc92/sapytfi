import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import { uniqBy } from 'lodash'
import CrearExamen from './CrearExamen';
import LineChart from '../Shared/LineChart'
import SubirMaterialComp from './SubirMaterial'
import { Progress } from 'antd';

import {
    AppstoreOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    DiffOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const { SubMenu } = Menu;

class AulaPorDentro extends Component {

    componentDidMount() {
        const { getExamen } = this.props;

        getExamen();
    }

    state = {
        collapsed: false,
        mostrarEst: false,
        mostrarExamenes: false,
        examenId: ''
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    getEstadisticasExamenOBJ = (examen) => {
        // const filteredByAulas = examen.filter(x => x.aula === this.props.location.param1.x.id);
        const filteredByAulas = examen.filter(x => x.aula === 25);

        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return ({
                data: [
                    {
                        name: "Intento",
                        value: x.intentos
                    },
                    {
                        name: "Aciertos",
                        value: x.aciertos
                    }
                ],
                label: x.titulo,
                id_examen: x.id_examen
            })
        })
    }

    renderCharts = () => {
        const { examen } = this.props;

        const examenEst = this.getEstadisticasExamenOBJ(examen);

        console.log('examenEst', examenEst);

        const example = examenEst.map(x =>  <LineChart dataS={x}/>)

        return [...example];
    }

    renderClases = () => {
        const { examen } = this.props;

        const filteredByAulas = examen.filter(x => x.aula === 25);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return(
                <Menu.Item onClick={() => this.handleShowExamenes(x.id_examen)}>
                    {x.titulo}
                </Menu.Item>
            )
        })

    }

    renderExamenes = () => {
        const { examen, deleteExamen } = this.props;
        const { examenId } = this.state
        const filteredByAulas = examen.filter(x => x.aula === 25);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.filter(j => j.id_examen === examenId).map(x => {
            return(
                <Button type="primary" danger onClick={() => deleteExamen(x.id_examen)}> Eliminar {x.titulo} </Button>
            )
        })
    }

    renderExamenesCreados = () => {
        const { examen } = this.props;

        const filteredByAulas = examen.filter(x => x.aula === 25);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        return filterByExam.map(x => {
            return(
                <Menu.Item onClick={() => this.handleShowExamenes(x.id_examen)}>
                    {x.titulo}
                </Menu.Item>
            )
        })
    }

    renderMaterial = () => {
        return <SubirMaterialComp />
    }

    handleShowExamenes = (id) => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: true,
            mostrarMaterial: false,
            examenId: id
        })
    }


    handleShowEstadisticas = (idExamn) => {
        this.setState({
            mostrarEst: true,
            mostrarExamenes: false,
            mostrarMaterial: false
        })

    }

    handleShownSubirMaterial = () => {
        this.setState({
            mostrarEst: false,
            mostrarExamenes: false,
            mostrarMaterial: true
        })
    }

    render() {
        const { guardarExamen } = this.props;
        const { collapsed, mostrarEst } = this.state

        return (
            <div>
                <NavBar />
                    <div className={styles.containerAulaPag}>
                        <div style={collapsed ? {width: 80} : { width: 256 }} className={styles.sider}>
                            <Menu
                                mode="inline"
                                theme="dark"
                                inlineCollapsed={this.state.collapsed}
                            >
                                <Menu.Item onClick={this.toggleCollapsed} icon={React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} />
                                <SubMenu  icon={<DiffOutlined />} title="Clases">
                                    <Menu.Item >
                                        Crear clase
                                    </Menu.Item>
                                        <SubMenu title="Revisar clases">
                                            { this.renderClases() }
                                        </SubMenu>
                                    <Menu.Item onClick={() => this.handleShowEstadisticas()}>
                                        Asistencias clases
                                    </Menu.Item>
                                        {/* <SubMenu  icon={<MailOutlined />} title="Estadisticas examenes">
                                            { this.renderExamenes() }
                                        </SubMenu> */}
                                </SubMenu>
                                <SubMenu  icon={<DiffOutlined />} title="Examenes">
                                    <Menu.Item >
                                        <CrearExamen
                                            // idAulaExamen={this.props.location.param1.x.id}
                                            idAulaExamen={25}
                                            guardarExamen={guardarExamen}
                                        />
                                    </Menu.Item>
                                        <SubMenu title="Revisar Examenes">
                                            { this.renderExamenesCreados() }
                                        </SubMenu>
                                    <Menu.Item onClick={() => this.handleShowEstadisticas()}>
                                        Estadisticas Examenes
                                    </Menu.Item>
                                        {/* <SubMenu  icon={<MailOutlined />} title="Estadisticas examenes">
                                            { this.renderExamenes() }
                                        </SubMenu> */}
                                </SubMenu>
                                <Menu.Item onClick={() => this.handleShownSubirMaterial()} icon={React.createElement(UploadOutlined)}>
                                        Subir Material
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className={styles.containerRightBracket}>
                            <div className={styles.containerGraphs}>
                            { this.state.mostrarEst && this.renderCharts()}
                            { this.state.mostrarExamenes && this.renderExamenes()}
                            { this.state.mostrarMaterial && this.renderMaterial()}
                            </div>

                        </div>
                    </div>
            </div>
        );
    }
}

export default AulaPorDentro;
