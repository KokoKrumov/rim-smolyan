import React, {Component} from 'react';
import heroSupportUsBg from "../../../assets/images/heroSupportUsBg.jpg";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../../actions";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {FormattedMessage, injectIntl} from 'react-intl';

class SupportUs extends Component {

    state = {}

    handleShowModal(data, e) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {
        const {intl} = this.props;
        return (
            <div className='support-us-page'>
                <div className='hero__wrap'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${heroSupportUsBg})`
                        }}
                    >
                        <Container>
                            <Row>
                                <Col lg={5}>
                                    <h3 className='h3 title'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "important-support"})}}
                                    >
                                    </h3>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row className='justify-content-between'>
                                <Col lg={5}>
                                    <p className='paragraph-3'
                                       dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "important-support-text"})}}
                                    >
                                    </p>
                                </Col>
                                <Col lg={5}>
                                    <p>
                                        <Link
                                            className='links'
                                            to="/#"
                                            onClick={(e) => {
                                                this.handleShowModal('modal-redirect', e)
                                            }}
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "status-for-awarding"})}}
                                            >
                                            </span>
                                        </Link>
                                        <Link
                                            className='links'
                                            to="/#"
                                            onClick={(e) => {
                                                this.handleShowModal('modal-redirect', e)
                                            }}
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "donors-for-enrichment"})}}
                                            >
                                            </span>
                                        </Link>

                                    </p>
                                </Col>
                            </Row>
                        </Container>

                    </div>

                </div>
                <Container>
                    <h2 className="h2">
                        Подкрепете ни чрез:
                    </h2>
                    <div className='modal_tabs-wrap'>
                        <Tab.Container id="supports-examples" defaultActiveKey="support-examples">
                            <Nav className="nav-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="authentic-items" className='tab-item'>
                                        <FormattedMessage id="biography"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="cash-donation" className='tab-item'>
                                        <FormattedMessage id="interests"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="volunteer-work" className='tab-item'>
                                        <FormattedMessage id="publications"/>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="authentic-items">
                                    <h3 className='h3'>
                                        <FormattedMessage id="biography"/>
                                    </h3>


                                </Tab.Pane>
                                <Tab.Pane eventKey="cash-donation">
                                    <h3 className='h3'>
                                        <FormattedMessage id="interests"/>
                                    </h3>

                                </Tab.Pane>
                                <Tab.Pane eventKey="volunteer-work">
                                    <h3 className='h3'>
                                        <FormattedMessage id="publications"/>
                                    </h3>

                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
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
)(SupportUs));
