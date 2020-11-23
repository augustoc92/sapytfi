import { Modal, Button } from 'antd';
import React from 'react';

class CustomModal extends React.Component{

    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
    console.log(e);
    this.setState({
        visible: false,
    });
    };

    handleCancel = e => {
    console.log(e);
    this.setState({
        visible: false,
    });
    };

    render() {
        const { columns, data } = this.props;

        return(
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )

    }
}

export default CustomModal;




