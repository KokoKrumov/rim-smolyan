import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalRedirectContent from "./ModalRedirectContent";
import ModalNedelovContent from "./ModalNedelovContent";

class ModalComponent extends Component {

    state = {
        modalIsOpen: false,
        modalContent: ''
    }

    componentDidMount() {
        console.log(this.props)
    }

    closeModal = () => {
        console.log('close')
        this.setState({
            modalIsOpen: false,
            modalContent: ''
        })
    }

    componentDidUpdate() {
        if(this.props.modal && this.state.modalContent !== this.props.modal.type){
            console.log(this.props)
            this.setState({
                modalIsOpen: this.props.modal.modalIsOpen,
                modalContent: this.props.modal.type
            })
            this.returnContent(this.state.modalContent)
        }
    }

    returnContent = (content) => {
        switch (content) {
            case 'modal-redirect':
                // code block
                return <ModalRedirectContent closeModal={this.closeModal}/>
            case 'modal-laslo':
                // code block
                return <ModalNedelovContent closeModal={this.closeModal}/>
            default:
                // code block
                return <ModalRedirectContent closeModal={this.closeModal}/>
        }
    }


    render() {
        return (
            <div className='modal__wrap' onClick={() => {
                this.closeModal()
            }}>
                <Modal show={this.state.modalIsOpen}>
                    <Modal.Body>
                        {this.returnContent(this.state.modalContent)}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;
