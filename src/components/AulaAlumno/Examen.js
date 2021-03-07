import React, { Component } from 'react';
import styles from './AulaAlumno.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, message, Space, Card, Button, Modal, Input, Radio } from 'antd';
import { Link } from "react-router-dom";
import RadioPreguntasGroup from './radioPreguntasGroup';

export default class Examen extends Component {

    checkExamen = () => {
        const { examen }  = this.props;
        const idAula = this.props.location.param1.x.id

        return examen.filter(x => x.aula === idAula);
    }

    state = {
        visible: false,
        preguntas: [],
        respuestasCorrectas: [],
        aprobo: false,
        intento: false
    }

    setVisible = (vis) => {
        this.setState({
            visible: vis
        })
    }

    success = () => {
        message.success('Esta aprobado');
    };

    error = () => {
        message.error('No aprobo');
    };

    warning = () => {
        message.warning('Seleccione algunas respuestas');
    };

    handleOk = () => {
        const { examen, idExamen, intentoExamen } = this.props;
        const { respuestasCorrectas, intento } = this.state;

        const thisExamen = examen.filter(x => x.id_examen === idExamen);
        const aprobo = this.getPorcentaje();

        intentoExamen(thisExamen[0].id_examen, thisExamen[0], aprobo);

        if (aprobo) {
            this.success();
        } else {
            this.error();
        }

        this.setState({
            visible: false,
            intento: !intento,
            respuestasCorrectas: []
        })
    }

    getPorcentaje = () => {
        const { examen, idExamen } = this.props;
        const { respuestasCorrectas } = this.state;
        const thisExamen = examen.filter(x => x.id_examen === idExamen);

        const TotalPreguntas = thisExamen.length;
        const totalRtasCorrectas = respuestasCorrectas.length;

        const porcentaje = (totalRtasCorrectas/TotalPreguntas) * 100;

        return  porcentaje > 50
    }

    createValidation = (id) => {
        const { respuestasCorrectas } = this.state;
        const newList = [...respuestasCorrectas]

        newList.push(id);

        this.setState({
            respuestasCorrectas: [...newList]
        })
    }

    removeFromValidation = (id) => {
        const { respuestasCorrectas } = this.state;
        const newList = [...respuestasCorrectas]

        for( var i = 0; i < newList.length; i++){
            if ( newList[i] === id) {
                newList.splice(i, 1);
            }
        }

        this.setState({
            respuestasCorrectas: [...newList]
        })
    }


    armarExamen = (elemen, indx) => {
        const { intento } = this.state;

        return (
            <RadioPreguntasGroup elementos={elemen} indice={indx}
            removeFromValidation={this.removeFromValidation}
            createValidation={this.createValidation}
            intento={intento}
            >

            </RadioPreguntasGroup>
        )
    }

    render() {
        const { examen, idExamen } = this.props;

        const thisExamen = examen.filter(x => x.id_examen === idExamen);

        return (
            <React.Fragment>
                <span style={{width: '100%'}} onClick={() => this.setVisible(true)}>
                    Examen: {thisExamen[0].titulo}
                </span>
                <Modal
                    title={thisExamen[0].titulo}
                    centered
                    okText={thisExamen[0].esPrueba ? 'Entregar' : 'Corregir'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={() => this.setVisible(false)}
                    width={1000}
                >
                    {!examen.esPrueba &&
                        <div> Es un examen de prueba </div>
                    }
                        { thisExamen.map((element, index) => {
                            return this.armarExamen(element,index);
                        })}
                </Modal>
            </React.Fragment>
        )
    }
}