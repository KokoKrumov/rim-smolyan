import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";

class AboutInfoLine extends Component {

    handleShowModal(data, url, e) {
        e.preventDefault();
        this.props.showModal(data, url)
    }

    render() {

        const {intl} = this.props;
        return (
            <div className='info-line info-line__red info-line__titled'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__titled__item'>
                            <p className='info-line__titled__text info-line__text-bold'>
                                <FormattedMessage id="about-us.info-line.support"/>
                            </p>
                            <p className='info-line__titled__text info-line__text-bold'>
                                <a href="/support-us"
                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'see-here'})}}
                                    className="link cta_outline cta_outline__light cta_outline__border-overflow"
                                ></a>
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
