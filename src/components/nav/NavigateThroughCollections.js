import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import arrowLeftLong from "../../assets/images/arrow-left-long.svg"
import arrowRightLong from "../../assets/images/arrow-right-long.svg"

function NavigateThroughCollections(props) {
    return (
        <div className='nav-through-collections'>
            <Container fluid>
                <Row>
                    <Col
                        md={6}>
                        <a
                            href={`/${props.collectionType}/${props.prevLink.collectionsType}`}>
                            <Row className='nav-through-collections__first-half'>
                                <Col md={5}/>
                            <Col md={7}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <img className='img' src={arrowLeftLong} alt=""/>
                                    </div>
                                    <div>
                                        <p className='nav-through-collections__direction'>
                                            Назад
                                        </p>
                                        <p className='nav-through-collections__direction__item'>
                                            {props.prevLink.title}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            </Row>
                        </a>
                    </Col>
                    <Col
                        md={6}>
                        <a
                            href={`/${props.collectionType}/${props.nextLink.collectionsType}`}>
                            <Row className='nav-through-collections__second-half'>
                                <Col md={7}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <p className='nav-through-collections__direction'>
                                            Назад
                                        </p>
                                        <p className='nav-through-collections__direction__item'>
                                            {props.nextLink.title}
                                        </p>
                                    </div>
                                    <div>
                                        <img className='img' src={arrowRightLong} alt=""/>
                                    </div>
                                </div>
                            </Col>
                            <Col md={5}/>
                            </Row>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default NavigateThroughCollections;
