

import React, { Component } from 'react';
import { Radio } from 'antd';


const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

export default class AulaAlumno extends Component {

    state = {
        valueRadio: ''
    }

    componentWillReceiveProps(props) {
        const { intento } = props;
        const { intento: intentoOld  } = this.props;

        if (intento !== intentoOld) {
            this.setState({
                valueRadio: ''
            })
        }
    }

    handleRadioChange = (e) => {
        const elemen = this.props.elementos;

        const { createValidation, removeFromValidation } = this.props

        if (parseInt(elemen.respuesta) === e.target.value) {
            createValidation(elemen.id)
        } else {
            removeFromValidation(elemen.id)
        }

        this.setState({
            valueRadio: e.target.value,
        });
    }

    render() {
        const elemen = this.props.elementos;
        const indx = this.props.indice;
        const posibleRta = elemen.posibles_rtas.split('-');


        return (
            <React.Fragment>
                <h2> <b> {elemen.pregunta} </b> </h2>
                <Radio.Group onChange={this.handleRadioChange} value={this.state.valueRadio}>
                    {posibleRta.map((x, index) => {
                    return (
                        <Radio key={index} value={index} style={radioStyle}> {x} </Radio>
                        )
                    })}
                </Radio.Group>
            </React.Fragment>
        )
    }
}