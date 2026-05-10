import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalRedirectContent from "./ModalRedirectContent";
import ModalNedelovContent from "./ModalShishkovContent";
import {connect} from "react-redux";
import {closeModal} from "../../actions";
import ModalTeamContent from "./ModalTeamContent";
import { withRouter } from "../../utilities/withRouter";

class ModalComponent extends Component {

    state = {
        modalIsOpen: false,
        modalContent: ''
    }

    componentDidUpdate() {
        if ((this.props.modal && this.state.modalContent !== this.props.modal.type) || (this.state.modalIsOpen !== this.props.modal.modalIsOpen)) {
            this.setState({
                modalIsOpen: this.props.modal.modalIsOpen,
                modalContent: this.props.modal.type
            })
            this.returnContent(this.state.modalContent)
        }
    }

    handleCloseModal = () => {
        this.props.closeModal(this.state.modalContent);
        if (this.props.modal.user && this.props.modal.user.nickname) {
            //if the modal was opened from cardTeamMember
            // so we have a nickname in the end of the location href
            //when we close the modal, then remove the nickname from there
            const location = window.location.pathname;
            let resetLocation = location.replace(`/${this.props.modal.user.nickname}`, '')
            this.props.navigate(resetLocation)
        } else if (this.props.modal.type === "modal-shishkov") {
            //if the modal is from shiskov
            const location = window.location.pathname;
            let resetLocation = location.replace(`/stoyu-shishkov`, '')
            this.props.navigate(resetLocation)
        }
    }

    returnContent = (content) => {
        switch (content) {
            case 'modal-redirect':
                return <ModalRedirectContent/>
            case 'modal-shishkov':
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalComponent));

