import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Base64 } from 'js-base64';
import FileUpload from './FileUpload';


export default class SubirMaterial extends React.Component{
    render() {
        return (
            <div>
                <FileUpload aula={this.props.aula} user={this.props.user}/>
            </div>
        );
    }
}
