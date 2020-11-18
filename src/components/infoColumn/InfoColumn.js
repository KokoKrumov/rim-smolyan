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
        seeMore: "see-more",
        isSmall: this.props.isSmall ? this.props.isSmall : false
    }

    handleShowModal(data, e) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {
        const {intl} = this.props;
        return (
            <div
                className='nae-container info-column nae-container_content-dark hero-bg'
                style={{
                    backgroundImage: `url(${this.props.backgroundIMage})`
                }}
            >
                <Container>
                    <div>
                        <div className='nae__title-line'>

                            {
                                this.state.isSmall
                                    ?
                                    <h2 className='h2'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.props.title})}}>
                                    </h2>
                                    :
                                    <h1 className='h1'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.props.title})}}>
                                    </h1>
                            }

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
                                                <a className="link cta_outline cta_outline__dark link-underline"
                                                    href="https://static.museumsmolyan.eu/docs/ustrojstvo_dejnost_rim_smolyan.pdf"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.rulesForActivity})}}
                                                >
                                                </a>
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
                                                        this.handleShowModal('modal-redirect', e)
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

