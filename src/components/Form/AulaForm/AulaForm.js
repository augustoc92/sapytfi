import React from 'react'
import { Input, Button } from 'antd'
import { map, omit } from 'lodash'
import { Field } from 'redux-form'
import { makeField } from '../../../helpers/makeField'
import styles from '../Form.module.css'

const AInput = makeField(Input)

export default class AulaForm extends React.Component {
    renderInput = (key) => {
        return (
            <div>
                {key}
            </div>
        )
    }

    renderFields = () => {
        const {
            selectedRow
        } = this.props
        return (
            map(omit(selectedRow[0], ['key']), (value, key) => (
            <div
                key={key}
                className={styles.field}
            >
                <div className={styles.prop}>
                {key.replace(/_/g, ' ')}
                </div>
                {this.renderInput(key)}
            </div>
            ))
        )
    }

    render() {
    const { handleSubmit } = this.props
        return (
            <div>
                <div className={styles.fieldsContainer}>
                    { this.renderFields() }
                </div>
            </div>
    )
    }
}