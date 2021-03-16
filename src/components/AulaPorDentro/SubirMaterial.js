import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileUpload from './FileUpload';
export default class SubirMaterial extends React.Component{
    render() {
        return (
            <div>
                <FileUpload
                    aula={this.props.aula}
                    guardarMaterial={this.props.guardarMaterial}
                    user={this.props.user}
                />
            </div>
        );
    }
}
