import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {FormattedMessage} from 'react-intl'
import Button from "react-bootstrap/Button";

class ModalComponent extends Component {

    render() {
        return (
            <div className='modal__wrap'>
                <Modal show={this.props.isOpen}>
                    <Modal.Header>
                        <Modal.Title>
                            <FormattedMessage id="modal.warning.title"/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormattedMessage id="modal.warning.text"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                                onClick={() => {
                                    this.props.closeModal()
                                }}
                        >
                            <FormattedMessage id="text.yes"/>
                        </Button>
                        <Button variant="primary"
                                onClick={() => {
                                    this.props.closeModal()
                                }}
                        >
                            <FormattedMessage id="text.cancel"/>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;
