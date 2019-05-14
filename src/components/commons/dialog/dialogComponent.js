import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class DialogComponent extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Varoitus
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.props.callback}>
                        Kyllä
                    </Button>
                    <Button variant="success" onClick={this.props.onHide}>
                        Ei
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect()(DialogComponent);
