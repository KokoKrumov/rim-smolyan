import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

class ModalNedelovContent extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="modal-text modal-title">
                    adsfsdaf
                </div>
                <div className="modal-text modal-paragraph">
                    asdfasdf
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

            </React.Fragment>
        );
    }
}

export default ModalNedelovContent;
