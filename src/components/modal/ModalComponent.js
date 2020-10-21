import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {FormattedMessage} from 'react-intl'
import Button from "react-bootstrap/Button";

class ModalComponent extends Component {

    render() {
        return (
            <div className='modal__wrap' onClick={() => {
                this.props.closeModal()
            }}>
                <Modal show={this.props.isOpen}>
                    <Modal.Body>
                        <div className="modal-text modal-title">
                            <FormattedMessage id="modal.warning.title"/>
                        </div>
                        <div className="modal-text modal-paragraph">
                            <FormattedMessage id="modal.warning.text"/>
                        </div>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <div className='mx-4'>
                                <a
                                    href='http://old.museumsmolyan.eu/'
                                    className='link cta_outline cta_outline__dark hvr-underline-from-center'
                                    variant="secondary"
                                    onClick={() => {
                                        this.props.closeModal()
                                    }}
                                >
                                    <FormattedMessage id="text.yes"/>
                                </a>
                            </div>
                            <div className='mx-4'>
                                <button
                                    className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                                    variant="primary"
                                    onClick={() => {
                                        this.props.closeModal()
                                    }}
                                >
                                    <FormattedMessage id="text.cancel"/>
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;
