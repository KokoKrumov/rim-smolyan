import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {closeModal} from "../../actions";
import {connect} from "react-redux";

class ModalRedirectContent extends Component {

    handleCloseModal = (e, data) => {
        e.preventDefault();
        this.props.closeModal(data);
    }

    render() {
        return (
            <React.Fragment>
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
                            onClick={(e) => {
                                this.handleCloseModal(e, 'modal-redirect');
                            }}
                        >
                            <FormattedMessage id="text.yes"/>
                        </a>
                    </div>
                    <div className='mx-4'>
                        <button
                            className='link cta_outline cta_outline__dark hvr-underline-from-center m-0'
                            variant="primary"
                            onClick={(e) => {
                                this.handleCloseModal(e, 'modal-redirect');
                            }}
                        >
                            <FormattedMessage id="text.cancel"/>
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    closeModal: data => dispatch(closeModal(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalRedirectContent);
