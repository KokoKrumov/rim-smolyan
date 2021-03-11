import React, {Component} from 'react';
import heroSupportUsBg from "../../../assets/images/heroSupportUsBg.jpg";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from "react-redux";
import {showModal} from "../../../actions";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {FormattedMessage, injectIntl} from 'react-intl';
import CardInfoLine from "../../infoLine/CardInfoLine";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/cjs/Card";
import {isTabletScreen} from "../../../utilities/browser";

class SupportUs extends Component {

    state = {
        isTabletScreenV: isTabletScreen(),
    }

    handleResize() {
        this.setState({
            isTabletScreenV: isTabletScreen()
        })
    }

    componentDidMount() {
        window.addEventListener('resize', () => {
            this.handleResize()
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this.handleResize()
        })
    }

    handleShowModal(data, url, e) {
        e.preventDefault();
        this.props.showModal(data, url)
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
                                        <a
                                            className='links'
                                            href="/administrative/#13"
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "status-for-awarding"})}}
                                            >
                                            </span>
                                        </a>
                                        <a
                                            className='links'
                                            href="/administrative/#14"
                                        >
                                            <span
                                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "donors-for-enrichment"})}}
                                            >
                                            </span>
                                        </a>

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
                        <Tab.Container id="supports-examples"
                                       defaultActiveKey={`${this.state.isTabletScreenV ? null : 'donation-of-authentic-items'}`}
                        >
                            <Nav className="nav-tabs">
                                <Nav.Item className={` ${this.state.isTabletScreenV ? 'container' : null}`}>
                                    <Nav.Link eventKey="donation-of-authentic-items"
                                              disabled={` ${(this.state.isTabletScreenV)}`}
                                              className={`tab-item`}>
                                        <FormattedMessage id="donation-of-authentic-items"/>
                                    </Nav.Link>
                                    {
                                        this.state.isTabletScreenV
                                            ?
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
                                            :
                                            null
                                    }
                                </Nav.Item>
                                <Nav.Item className={` ${this.state.isTabletScreenV ? 'container' : null}`}>
                                    <Nav.Link eventKey="cash-donation"
                                              className='tab-item'
                                              disabled={` ${(this.state.isTabletScreenV)}`}
                                    >
                                        <FormattedMessage id="cash-donation"/>
                                    </Nav.Link>
                                    {
                                        this.state.isTabletScreenV
                                            ?
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
                                            :
                                            null
                                    }
                                </Nav.Item>
                                <Nav.Item className={` ${this.state.isTabletScreenV ? 'container' : null}`}>
                                    <Nav.Link
                                        eventKey="volunteer-work"
                                        className='tab-item'
                                        disabled={` ${(this.state.isTabletScreenV)}`}
                                    >
                                        <FormattedMessage id="volunteer-work"/>
                                    </Nav.Link>
                                    {
                                        this.state.isTabletScreenV
                                            ?
                                            <Row>
                                                <Col lg={7}>
                                                    <CardInfoLine
                                                        title={"opportunities-for-volunteer-work"}
                                                        subtitle={"use-contact-form"}
                                                        link={'/contact-us'}
                                                        linkText={'here'}
                                                        isSmall={true}
                                                    />
                                                </Col>
                                            </Row>
                                            :
                                            null
                                    }
                                </Nav.Item>
                            </Nav>
                            {
                                !this.state.isTabletScreenV
                                    ?
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
                                                        subtitle={"use-contact-form"}
                                                        link={'/contact-us'}
                                                        linkText={'here'}
                                                        isSmall={true}
                                                    />
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                    </Tab.Content>
                                    :
                                    null
                            }
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
