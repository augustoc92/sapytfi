import React, { Component } from 'react';
import styles from './AulaAlumno.module.css';
import NavBar from '../Shared/NavBar';
import { Menu, Card, Button, Modal, Input, Radio } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

const { SubMenu } = Menu;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class AulaAlumno extends Component {

    componentDidMount() {
        const { getExamen } = this.props;

        getExamen();
    }

    state = {
        visible: false,
        preguntas: []
    }

    setVisible = (vis) => {
        this.setState({
            visible: vis
        })
    }

    armarExamen = (elemen, indx) => {
        const posibleRta = elemen.posibles_rtas.split('-');


        return (
            <React.Fragment>
                <div> {elemen.pregunta} </div>
                <Radio.Group onChange={this.handleRadioChange} value={1}>
                    {posibleRta.map((x, index) => {
                        return (
                        <Radio key={index} value={index} style={radioStyle}> {x} </Radio>
                        )
                    })}
                </Radio.Group>
            </React.Fragment>
        )
    }



    render() {
        console.log('this.props', this.props);
        const { visible } = this.state;
        const { examen } = this.props;
            // aula: "3"
            // esPrueba: false
            // id: 6
            // id_examen: "10"
            // posibles_rtas: "Si!-Re contra si che!-Me encanto!-De lo mejor del 2020! <3"
            // pregunta: "Esta bueno appLicados?"
            // respuesta: "3"
            // titulo: "Matemoto"

        return (
            <div>
                <NavBar>
                </NavBar>
                    <div className={styles.containerAula}>
                        <Button type="primary" onClick={() => this.setVisible(true)}>
                            Tomar Examen
                        </Button>
                        <Modal
                            title="Matemoto"
                            centered
                            okText="Crear examen"
                            visible={visible}
                            onOk={this.handleOk}
                            onCancel={() => this.setVisible(false)}
                            width={1000}
                        >
                        <div> Tiene todos los intentos que quiera para responder las siguientes preguntas </div>
                        { examen.map((element, index) => {
                            return this.armarExamen(element,index);
                        })}
                        </Modal>
                    </div>
            </div>
        );
    }
}

export default AulaAlumno;
