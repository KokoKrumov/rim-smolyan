import React, {Component} from 'react';
import Col from "react-bootstrap/cjs/Col";
import AliceCarousel from 'react-alice-carousel'
import Row from "react-bootstrap/cjs/Row";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";

function CarouselMegatron({listMegatronCarousel}) {
    const handleOnDragStart = (e) => e.preventDefault()

    if (listMegatronCarousel) {
        return (

            <AliceCarousel mouseTrackingEnabled>
                {listMegatronCarousel.map(item => {
                    return (
                        <div
                            className='carousel carousel__dark carousel__megatron hero-bg'
                            style={{
                                backgroundImage: `url(${item.bgImage})`
                            }}
                        >
                            <Container>
                                <Row
                                    key={item.id}
                                    onDragStart={handleOnDragStart}
                                    className="yours-custom-class"
                                >
                                    <Col lg={6}>
                                        <p>
                                            {item.title}
                                        </p>
                                        <p>
                                            <Link
                                                style={{marginTop: '2rem'}}
                                                className="link cta_outline cta_outline__light hvr-underline-from-left"
                                                to="#"
                                                itemProp="url"
                                                target=""
                                                rel="noopener nofollow noreferrer">
                                                към фондове
                                            </Link>
                                        </p>
                                    </Col>
                                    <Col lg={6}>
                                        <p>
                                            {item.type}
                                        </p>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    )
                })}
            </AliceCarousel>
        )
    } else {
        return (
            <div>
                <p>
                    Loading ...
                </p>
            </div>
        )
    }
}

export default CarouselMegatron;
