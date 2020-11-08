import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";

class CardInfoLine extends Component {

    state = {
        title: this.props.title
    }

    handleShowModal(e, data) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {

        const {intl} = this.props;
        return (
            <div className='info-line info-line__card info-line__bordered__white info-line__titled'>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__titled__item'>
                            <h2 className='h2'
                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}
                            >

                            </h2>
                            <p className='info-line__titled__text info-line__text-bold'>
                                <Link

                                    className="link cta_outline cta_outline__red cta_outline__border-overflow"
                                    to="#"
                                    itemProp="url"
                                    target=""
                                    onClick={(e) => {
                                        this.handleShowModal(e, 'modal-redirect')
                                    }} rel="noopener nofollow noreferrer"
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'see-here'})}}
                                >
                                </Link>
                            </p>
                        </div>
                    </div>
            </div>
        )
    }
}

export default injectIntl(connect(
    null,
    {
        showModal
    }
)(CardInfoLine));