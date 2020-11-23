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
import CardInfoLine from "../../infoLine/CardInfoLine";

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
                <Container className='support-us-page__main-content'>
                    <h2 className="h2">
                        <FormattedMessage id="support-us-through"/>:
                    </h2>
                    <div className='modal_tabs-wrap'>
                        <Tab.Container id="supports-examples" defaultActiveKey="donation-of-authentic-items">
                            <Nav className="nav-tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="donation-of-authentic-items" className='tab-item'>
                                        <FormattedMessage id="donation-of-authentic-items"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="cash-donation" className='tab-item'>
                                        <FormattedMessage id="cash-donation"/>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="volunteer-work" className='tab-item'>
                                        <FormattedMessage id="volunteer-work"/>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="donation-of-authentic-items">
                                    <Row>
                                        <Col lg={7}>
                                            <CardInfoLine
                                                title={"download-a-donation-contract"}
                                                link={'https://static.museumsmolyan.eu/docs/dogovor_za_darenie.doc'}
                                                linkText={'here'}
                                                isSmall={true}
                                            />
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="cash-donation">
                                    <Row>
                                        <Col lg={7}>
                                            <CardInfoLine
                                                title={"download-sponsorship-agreement"}
                                                link={'https://static.museumsmolyan.eu/docs/dogovor_za_sponsorstvo.doc'}
                                                linkText={'here'}
                                                isSmall={true}
                                            />
                                            <CardInfoLine
                                                title={"bank-transfer"}
                                                link={'https://static.museumsmolyan.eu/docs/bankova_smetka.docx'}
                                                linkText={'here'}
                                                isSmall={true}
                                            />
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="volunteer-work">
                                    <Row>
                                        <Col lg={7}>
                                            <CardInfoLine
                                                title={"opportunities-for-volunteer-work"}
                                                link={'/#'}
                                                linkText={'here'}
                                                isSmall={true}
                                            />
                                        </Col>
                                    </Row>
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
