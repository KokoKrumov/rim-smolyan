import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";

class AboutInfoLine extends Component {

    handleShowModal(e, data) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {

        const {intl} = this.props;
        return (
            <div className='info-line info-line__red'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold'>
                                <FormattedMessage id="about-us.info-line.support"/>
                            </p>
                            <p className='info-line__text info-line__text-bold'>
                                <Link

                                    className="link cta_outline cta_outline__light cta_outline__border-overflow"
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
                </Container>
            </div>
        )
    }
}

export default injectIntl(connect(
    null,
    {
        showModal
    }
)(AboutInfoLine));
