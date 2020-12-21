import React, { Component } from 'react';
import styles from './AulaPorDentro.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

const { SubMenu } = Menu;

class AulaPorDentro extends Component {
    state = {
        visible: false,
        rta: [],
        pregunta: '',
        respuesta: '',
        preguntasExamen: [],
        valueRadio: '',
        tipoExamen: 'prueba'
    }

    setVisible = () => {
        const { visible } = this.state;
        this.setState({
            visible: !visible
        })
    }

    agregarRta = () => {
        const { rta, respuesta } = this.state;
        const newRta = [...rta, respuesta]

        this.setState({
            rta: newRta,
            respuesta: ''
        });
    }

    handleChangeRespuesta = ({ target }) => {
        this.setState({ respuesta: target.value });
    }

    handleChangePregunta = ({ target }) => {
        this.setState({ pregunta: target.value });
    }

    handleRadioChange = e => {
        this.setState({
            valueRadio: e.target.value,
        });
    }

    handleExamenType = e => {
        this.setState({
            tipoExamen: e.target.value,
        });
    }

    agregarPregunta = () => {
        const { valueRadio, rta, tipoExamen, preguntasExamen, pregunta } = this.state;

        const PreguntaExamen = {
            pregunta: pregunta,
            opcionCorrecta: valueRadio,
            textoCorrecta: rta[valueRadio],
            opciones: rta
        }
        const nuevaListaPregutnas = [...preguntasExamen, PreguntaExamen]

        this.setState({
            rta: [],
            preguntasExamen: nuevaListaPregutnas,
            respuesta: '',
            pregunta: '',
            valueRadio: ''
        })
    }

    handleOk = () => {
        const { valueRadio, rta, tipoExamen, pregunta, preguntasExamen } = this.state;

        console.log('preguntas examen', preguntasExamen);

        this.setState({
            visible: false,
            rta: [],
            respuesta: '',
            pregunta: '',
            valueRadio: ''
        })
    }


    render() {
        const { visible, rta, valueRadio, pregunta, respuesta } = this.state;

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        const agregarStyle = {
            display: 'block',
            marginTop: '15px'
        };

        return (
            <div>
                <NavBar>
                </NavBar>
                    <div className={styles.containerAula}>
                        <Button type="primary" onClick={() => this.setVisible(true)}>
                            Crear examen
                        </Button>
                        <Modal
                            title="Examen"
                            centered
                            okText="Crear examen"
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={() => this.setVisible(false)}
                            width={1000}
                        >
                            <label for="pregunta">Pregunta</label>
                            <Input
                                id="pregunta"
                                value={pregunta}
                                onChange={this.handleChangePregunta}
                            />
                            <label for="respuesta">Respuesta</label>
                            <Input
                                value={respuesta}
                                onChange={this.handleChangeRespuesta}
                                id="respuesta"
                            />
                            <Button style={agregarStyle} onClick={this.agregarRta}> Agregar Respuesta </Button>
                            <Radio.Group onChange={this.handleRadioChange} value={valueRadio}>
                                {rta.map((x, index) => {
                                    return (
                                    <Radio key={index} value={index} style={radioStyle} className={styles.possibleAnswer}> {x} </Radio>
                                    )
                                })}
                            </Radio.Group>
                            <div>
                            {rta.length > 0 && <label> Recuerde seleccionar la respuesta correcta </label> }
                            </div>
                            <div className={styles.agregarPreguntaContainer}>
                                <Button type="primary" onClick={this.agregarPregunta}> Agregar esta pregunta y finalizar </Button>
                                <Button type="primary" onClick={this.agregarPregunta}> Agregar otra pregunta </Button>
                            </div>
                            <div style={{marginTop: '15px'}}>
                                <Radio.Group name="radiogroup" onChange={this.handleExamenType} defaultValue='prueba'>
                                    <Radio value='prueba'>Examen de prueba</Radio>
                                    <Radio value='nota'>Examen con nota</Radio>
                                </Radio.Group>
                            </div>
                        </Modal>
                    </div>
            </div>
        );
    }
}

export default AulaPorDentro;
