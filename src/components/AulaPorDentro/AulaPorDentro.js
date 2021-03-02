import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import { uniqBy } from 'lodash'
import CrearExamen from './CrearExamen';
import LineChart from '../Shared/LineChart'
import { Progress } from 'antd';

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
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
        examenId: false
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    getEstadisticasExamenOBJ = (examen, examenId) => {
        const filteredByAulas = examen.filter(x => x.aula === this.props.location.param1.x.id);
        const filterByExam = uniqBy(filteredByAulas, 'id_examen');
        const filterByExamID = filterByExam.filter(x => x.id_examen === examenId );
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

    renderCharts = (examenId) => {
        const { examen } = this.props;

        const examenEst = this.getEstadisticasExamenOBJ(examen, examenId);

        console.log('examenEst', examenEst);

        const example = examenEst.map(x =>  <LineChart examenId={examenId} dataS={x}/>)

        return [...example];
    }

    renderExamenes = () => {
        // const { examen } = this.props;

        // const filteredByAulas = examen.filter(x => x.aula === 25);
        // const filterByExam = uniqBy(filteredByAulas, 'id_examen');

        // return filterByExam.map(x => {
        //     return(
        //         <Menu.Item onClick={() => this.handleShowEstadisticas(x.id_examen)}>
        //             {x.titulo}
        //         </Menu.Item>
        //     )
        // })
    }

    handleShowEstadisticas = (idExamn) => {
        this.setState({
            mostrarEst: true,
            examenId: 1
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
                                <SubMenu  icon={<MailOutlined />} title="Examenes">
                                    <Menu.Item >
                                        <CrearExamen
                                            idAulaExamen={this.props.location.param1.x.id}
                                            idAulaExamen={25}
                                            guardarExamen={guardarExamen}
                                        />
                                    </Menu.Item>
                                    <Menu.Item onClick={() => this.handleShowEstadisticas()}>
                                        Estadisticas Examenes
                                    </Menu.Item>
                                        {/* <SubMenu  icon={<MailOutlined />} title="Estadisticas examenes">
                                            { this.renderExamenes() }
                                        </SubMenu> */}
                                </SubMenu>
                            </Menu>
                        </div>
                        <div className={styles.containerRightBracket}>
                            <div className={styles.containerGraphs}>
                            { this.state.examenId && this.renderCharts(this.state.examenId)}
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default AulaPorDentro;
