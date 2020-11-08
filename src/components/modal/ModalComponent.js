import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalRedirectContent from "./ModalRedirectContent";
import ModalNedelovContent from "./ModalShishkovContent";
import {connect} from "react-redux";
import {closeModal} from "../../actions";
import ModalTeamContent from "./ModalTeamContent";

class ModalComponent extends Component {

    state = {
        modalIsOpen: false,
        modalContent: ''
    }

    componentDidUpdate() {
        if (this.props.modal && this.state.modalContent !== this.props.modal.type || this.state.modalIsOpen !== this.props.modal.modalIsOpen) {
            this.setState({
                modalIsOpen: this.props.modal.modalIsOpen,
                modalContent: this.props.modal.type
            })
            this.returnContent(this.state.modalContent)
        }
    }

    handleCloseModal = () => {
        this.props.closeModal(this.state.modalContent);
    }

    returnContent = (content) => {
        switch (content) {
            case 'modal-redirect':
                return <ModalRedirectContent/>
            case 'modal-nedelov':
                return <ModalNedelovContent/>
            case 'modal-team':
                return <ModalTeamContent/>
            default:
                return <ModalRedirectContent/>
        }
    }


    render() {
        return (
            <div className='modal__wrap'>
                <Modal show={this.state.modalIsOpen} onHide={this.handleCloseModal}>
                    <Modal.Body>
                        {this.returnContent(this.state.modalContent)}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
            modal: state.modal
        })

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);

