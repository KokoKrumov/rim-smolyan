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

            <AliceCarousel
                mouseTrackingEnabled
                // dotsDisabled={true}
                // buttonsDisabled={true}
                // ref={(el) => (this.Carousel = el)}
            >
                {listMegatronCarousel.map(item => {
                    return (
                        <div
                            className='carousel carousel__dark carousel-megatron hero-bg'
                            style={{
                                backgroundImage: `url(${item.bgImage})`
                            }}
                        >
                            {/*<div className='carousel-control'>*/}
                            {/*    <button onClick={() => this.Carousel.slidePrev()}>Prev button</button>*/}
                            {/*    <button onClick={() => this.Carousel.slideNext()}>Next button</button>*/}
                            {/*</div>*/}
                            <Container>
                                <Row
                                    key={item.id}
                                    onDragStart={handleOnDragStart}
                                    className="carousel-megatron__row"
                                >
                                    <Col lg={6}>
                                        <h3 className='carousel__title'>
                                            {item.title}
                                        </h3>
                                        <p className='carousel__type'>
                                            {item.type}
                                        </p>
                                        <p className='carousel-megatron__description paragraph-3'>
                                            {item.description}
                                        </p>
                                        <Row>
                                            <Col lg={6} className='carousel__data-info__bordered'>
                                                <div className='carousel__data-info__wrap'>
                                                    <p className='carousel__data-info__title'>
                                                        Размери:
                                                    </p>
                                                    <p className='carousel__data-info__description'>
                                                        {item.height}
                                                    </p>

                                                    <p className='carousel__data-info__description'>
                                                        {item.width}
                                                    </p>
                                                </div>
                                                <div className='carousel__data-info__wrap'>
                                                    <p className='carousel__data-info__title'>
                                                        Селище:
                                                    </p>
                                                    <p className='carousel__data-info__description'>
                                                        {item.settlement}
                                                    </p>
                                                </div>
                                            </Col>
                                            <Col lg={6} className='carousel__data-info__bordered'>
                                                <div className='carousel__data-info__wrap'>
                                                    <p className='carousel__data-info__title'>
                                                        Датировка:
                                                    </p>
                                                    <p className='carousel__data-info__description'>
                                                        {item.dating}
                                                    </p>
                                                </div>
                                                <div className='carousel__data-info__wrap'>
                                                    <p className='carousel__data-info__title'>
                                                        Инв. номер:
                                                    </p>
                                                    <p className='carousel__data-info__description'>
                                                        {item.number}
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className='carousel__data-link'>
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
                                    <Col lg={5}>
                                        <div className='carousel-megatron__img-wrap'>
                                            <img className="w-100" src={item.image} alt="" itemProp="image"/>
                                        </div>
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
