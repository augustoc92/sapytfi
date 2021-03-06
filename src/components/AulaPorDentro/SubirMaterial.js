import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Base64 } from 'js-base64';
import FileUpload from './FileUpload';


export default class SubirMaterial extends React.Component{
    state = {
        fileList: [],
        filesToUpload: []
    };

    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        this.setState({ fileList });
    };

    checkActionParameter = (e) => {
        console.log('e', e);
    }


    render() {
        console.log('File List', this.state.fileList);
        console.log('filesToUpload', this.state.filesToUpload);

        const { filesToUpload } = this.state;

        let incFilesToUp = [...filesToUpload];

        return (
            <div>
                <Upload
                    accept=".pdf"
                    showUploadList={true}
                    multiple={true}
                    onChange={this.handleChange}
                    action={this.checkActionParameter}
                    beforeUpload={file => {
                        const reader = new FileReader();

                        reader.onload = e => {
                            incFilesToUp.push(e.target.result)
                            this.setState({
                                filesToUpload: incFilesToUp
                            })
                        };
                        reader.readAsText(file);

                        return false;
                    }}
                    fileList={this.state.fileList}
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <FileUpload />
            </div>

        );
    }
}
