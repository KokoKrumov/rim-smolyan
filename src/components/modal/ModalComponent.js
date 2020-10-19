import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal'

class ModalComponent extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
    }

    render() {
        return (
            <div className='modal__wrap'>
                <Modal show={this.props.isOpen}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    {/*<Modal.Footer>*/}
                    {/*    <Button variant="secondary" onClick={handleClose}>*/}
                    {/*        Close*/}
                    {/*    </Button>*/}
                    {/*    <Button variant="primary" onClick={handleClose}>*/}
                    {/*        Save Changes*/}
                    {/*    </Button>*/}
                    {/*</Modal.Footer>*/}
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;
