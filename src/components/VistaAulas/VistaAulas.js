import React, { Component } from 'react';
import styles from './VistaAulas.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

class VistaAulas extends Component {

    state = {
        isProfe: false,
    }

    componentDidMount() {
        const { getAula, getAlumnosXAula } = this.props;
        const { user, userObj } = this.props;

        const { permisos } = user;

        const isProfe = permisos === '1';

        getAula();
        getAlumnosXAula();

        this.setState({
            isProfe: isProfe
        })
    }


    createAulas = () => {
        const { isProfe } = this.state;
        const { userObj } = this.props;

        if (!userObj.id) {
            return;
        }
        if (isProfe) {
            return this.createAulasProfe();
        } else {
            return this.createAulasAlumno();
        }
    }


    createAulasAlumno = () => {
        const { aula, userObj, alumnosXAula } = this.props;

        const aulasAlumno = alumnosXAula.filter(x => x.id_alumno === userObj.id.toString()).map(p => p.id_aula);

        const aulasDelAlumno = aula.filter(x => aulasAlumno.includes(x.id.toString()));

        return aulasDelAlumno.map(x => {
            const newTo = {
                pathname: "/aulaalumno",
                param1: {x}
            };

            return (
                <Link key={x.id} to={newTo} params={{ testvalue: "hello" }}>
                    <Card
                        hoverable
                        style={{ width: 240, height: 100 }}
                        cover={<img alt="example" style={{height: '120px'}} src={x.imagenUrl}/>}
                    >
                        <Meta title={x.nombre_aula} description={x.horario_clase} />
                    </Card>
                </Link>
            )
        })
    }


    createAulasProfe = () => {
        const { aula, userObj } = this.props;
        const aulaFilter = aula.filter(x =>  x.profesor === userObj.id.toString());

        return aulaFilter.map(x => {

            const newTo = {
                pathname: "/aulapordentro",
                param1: {x}
            };

            return (
                <Link key={x.id} to={newTo} params={{ testvalue: "hello" }}>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" style={{height: '120px'}} src={x.imagenUrl}/>}
                    >
                        <Meta title={x.nombre_aula} description={x.horario_clase} />
                    </Card>
                </Link>
            )
        })
    }

    render() {
        const aulas = this.createAulas();

        return (
            <div>
                <NavBar />
                    <div className={styles.containerAula}>
                        {aulas}
                    </div>
            </div>
        );
    }
}

export default VistaAulas;
