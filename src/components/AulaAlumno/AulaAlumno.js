import React, { Component } from 'react';
import styles from './AulaAlumno.module.css';
import NavBar from '../Shared/NavBar';
import { Button, Modal, Input, Radio } from 'antd';
import { Link } from "react-router-dom";
import { uniqBy } from 'lodash';
import ExamenComp from './Examen';
import RadioPreguntasGroup from './radioPreguntasGroup';
import { groupBy, map } from 'lodash';

class AulaAlumno extends Component {

    componentDidMount() {
        const { getExamen } = this.props;

        getExamen();
    }

    splitExamenes = () => {
        const { examen } = this.props;
        const idAula = this.props.location.param1.x.id;

        // const idAula = 25;

        const examenesDeLAula = examen.filter(x => x.aula === idAula);


        return uniqBy(examenesDeLAula, 'id_examen');
    }

    render() {
        const { examen, intentoExamen } = this.props;
        const examenesDelAula = this.splitExamenes();

        return (
            <div>
                <NavBar>
                </NavBar>
                    <div className={styles.containerAula}>
                        {
                            examenesDelAula.map(exam =>
                                {
                                    return (
                                        <ExamenComp examen={examen} idExamen={exam.id_examen} intentoExamen={intentoExamen}/>
                                )
                            }
                                )
                        }

                    </div>
            </div>
        );
    }
}

export default AulaAlumno;
