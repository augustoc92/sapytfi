import React, { useRef, useState } from 'react';
import { Upload, Button, message } from 'antd';
import styles from './AulaPorDentro.module.css';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {
    const stylesProgressBar = {
        height: '1rem',
        width: '0%',
        backgroundColor: 'rgb(68, 212, 231)',
        color: 'white',
        padding: '2px'
    };

    const [file, setFile] = useState(''); // storing the uploaded file
    const [data, getFile] = useState({ name: "", path: "" });     // storing the recived file from backend
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        setFile(file); // storing file
    }

    const success = () => {
        message.success('El archivo esta guardado con exito');
    };

    const error = () => {
        message.error('Hubo un error al guardar el archivo, compruebe su red');
    };

    const uploadFile = () => {
        const formData = new FormData();
        const { aula, guardarMaterial } = props;

        formData.append('file', file); // appending file
        let noError = true;
        console.log('formData', formData)
        console.log('props.user', props.user)
        console.log('file', file)
        axios.post(`http://localhost:8080/upload/${aula}`, formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
                setFile(null);
                success();
            }
        }).catch(err => {
            error();
            noError = false;
            console.log(err);
        })
        if (noError) {
            guardarMaterial({
                nombre: file.name,
                esAlumno: false,
                claseAdjunta: 1,
                usuarioUpload: props.user,
                dateUpload: "recently",
                tipo: 'pdf',
                aula: aula
            });
        }
    }

    return (
        <div>
            <div className={styles.fileUpload}>
                <label htmlFor="file-upload" className={styles.customFileUpload}>
                    <UploadOutlined />Seleccione archivo para subir
                </label>
                <input
                    id="file-upload"
                    type="file" name="Upload" accept="application/pdf" ref={el} onChange={handleChange}
                />
            <hr />
                { file && <div>  Se subira el archivo: <b> {file.name} </b> </div> }
            <hr />
                <Button type="primary" onClick={uploadFile} className={styles.botonEjemplo}>
                    Subir y guardar
                </Button>
            <hr />
            </div>
        </div>
    );
}
export default FileUpload;