import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from "react-redux";
import {showModal} from "../../actions";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/cjs/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class AccordionBlock extends Component {

    state = {
        content: this.props.content,
        numberOfClickedCard: null
    }

    handleShowModal = (data, user, e) => {
        e.preventDefault();
        this.props.showModal(data, user);
    }

    activateTheAccordionItem = (blockId) => {
        console.log(blockId);
        if (this.state.numberOfClickedCard === blockId) {
            this.setState({numberOfClickedCard: null})
        } else {
            this.setState({numberOfClickedCard: blockId})
        }
    }


    render() {
        const {intl} = this.props;
        return (
            <Accordion defaultActiveKey="1">
                {
                    this.state.content.map(block => {
                        return (
                            <React.Fragment
                                key={block.id}
                            >
                                <Card
                                    className={`accordion__wrap ${this.state.numberOfClickedCard === block.id ? `accordion__wrap__active` : ``}`}
                                >

                                    <Accordion.Toggle
                                        as={Card.Header}
                                        eventKey={block.id}
                                        onClick={() =>
                                            this.activateTheAccordionItem(block.id)
                                        }
                                    >
                                        <Container>
                                            <Row className='justify-content-between'>
                                                <Col lg={8}>
                                                    <h3
                                                        className='h3'
                                                        dangerouslySetInnerHTML={{__html: block.title}}
                                                    >
                                                    </h3>
                                                </Col>
                                                <Col lg={1}>
                                                    <div className='accordion__arrow'>
                                                        <svg width="100%" height="100%" viewBox="0 0 5 9" fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.8" fillRule="evenodd" clipRule="evenodd"
                                                                  d="M0.639618 8.72206L-3.53289e-07 8.08244L3.72138 4.36106L-2.79584e-08 0.639679L0.639618 6.08446e-05L5 4.36044L0.639618 8.72206Z"/>
                                                        </svg>
                                                    </div>
                                                </Col>
                                            </Row>


                                        </Container>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={block.id}>
                                        <Card.Body>
                                            <Container>
                                                <div
                                                    dangerouslySetInnerHTML={{__html: block.content}}
                                                >
                                                </div>
                                            </Container>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>

                            </React.Fragment>
                        )
                    })
                }
            </Accordion>

        )
    }
}


export default injectIntl(connect(
    null,
    {
        showModal
    }
)(AccordionBlock));

