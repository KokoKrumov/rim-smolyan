import React, {Component} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';
import {connect} from "react-redux";
import {showModal} from "../../actions";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/cjs/Card";

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
                                    className={`accordion__wrap ${this.state.numberOfClickedCard === block.id ? `bg-gray` : ``}`}
                                >

                                    <Accordion.Toggle
                                        as={Card.Header}
                                        eventKey={block.id}
                                        onClick={() =>
                                            this.activateTheAccordionItem(block.id)
                                        }
                                    >
                                        <Container>
                                            <h3
                                                className='h3'
                                                dangerouslySetInnerHTML={{__html: block.title}}
                                            >
                                            </h3>
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

