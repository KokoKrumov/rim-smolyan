import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import {injectIntl} from 'react-intl';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class InfoColumn extends Component {

    state = {
        showMoreLink: this.props.showMoreLink,
        showRulesForActivity: this.props.showRulesForActivity,
        columns: this.props.columns,
        rulesForActivity: "rules-for-activity",
        seeMore: "see-more"
    }

    handleShowModal(e, data) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {
        const {intl} = this.props;
        return (
            <div
                className='nae-container nae-container_content-dark hero-bg'
                style={{
                    backgroundImage: `url(${this.props.backgroundIMage})`
                }}
            >
                <Container>
                    <div>
                        <div className='nae__title-line'>
                            <h1 className='h1'
                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.props.title})}}>
                            </h1>

                        </div>
                        <div>
                            <p className={`paragraph-2 col-count-${this.state.columns}`}
                               dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.props.text})}}>
                            </p>
                            <Row>
                                <Col>
                                    {
                                        this.state.showRulesForActivity
                                            ?
                                            <p style={{marginTop: '2rem'}}>
                                                <Link

                                                    className="link cta_outline cta_outline__dark link-underline"
                                                    to="#"
                                                    itemProp="url"
                                                    target=""
                                                    onClick={(e) => {
                                                        this.handleShowModal(e, 'modal-redirect')
                                                    }} rel="noopener nofollow noreferrer"
                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.rulesForActivity})}}
                                                >
                                                </Link>
                                            </p>
                                            :
                                            null
                                    }

                                </Col>
                                <Col>
                                    {
                                        this.state.showMoreLink
                                            ?
                                            <p>
                                                <Link
                                                    style={{margin: '0 2rem'}}
                                                    className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                                    to="#"
                                                    itemProp="url"
                                                    target=""
                                                    onClick={(e) => {
                                                        this.handleShowModal(e, 'modal-redirect')
                                                    }} rel="noopener nofollow noreferrer"
                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.seeMore})}}
                                                >
                                                </Link>
                                            </p>
                                            :
                                            null
                                    }

                                </Col>
                            </Row>

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
)(InfoColumn));

