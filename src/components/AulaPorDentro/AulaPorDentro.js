import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import CrearExamen from './CrearExamen';
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
    };

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleEstadisticasExamenes = () => {

    }

    render() {
        const { guardarExamen } = this.props;
        const { collapsed } = this.state

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
                                    <Menu.Item > <CrearExamen guardarExamen={guardarExamen} /> </Menu.Item>
                                    <Menu.Item >
                                        <div type="primary"  onClick={this.handleEstadisticasExamenes}>
                                            Estadisticas examenes
                                        </div>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                        <div className={styles.containerRightBracket}>
                            <div> Resto pagina </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default AulaPorDentro;
