import React, {useState} from 'react';
import Col from "react-bootstrap/cjs/Col";
import AliceCarousel from 'react-alice-carousel'
import Row from "react-bootstrap/cjs/Row";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import carouselMegatronArrowRight from "../../assets/images/carousel__right-arrow.svg";
import carouselMegatronArrowLeft from "../../assets/images/carousel__left-arrow.svg";
import {connect} from "react-redux";
import {showModal} from "../../actions";

function CarouselMegatron({listMegatronCarousel, showModal}) {
    const handleOnDragStart = (e) => e.preventDefault()
    const [item, setItem] = useState(1);
    let carousel = React.createRef();

    function onSlideChanged(e) {
        setItem(e.item + 1)
    }

    function handleShowModal(data, url, e) {
        e.preventDefault();
        showModal(data, url)
    }

    if (listMegatronCarousel) {
        return (
            <div className='carousel-megatron__wrap'>
                <div className='carousel-megatron__controls__out'>
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <div className='carousel-megatron__controls'>
                                    <div>
                                        <p className='carousel-megatron__controls-index'>
                                            {item}/{listMegatronCarousel.length}
                                        </p>
                                    </div>

                                    <div className='carousel-megatron__controls__wrap'>
                                        <button className='btn carousel__controls-btn'
                                                onClick={() => carousel.slidePrev()}>
                                            <img className="carousel-megatron__controls-btn__img"
                                                 src={carouselMegatronArrowLeft} alt=""
                                                 itemProp="image"/>
                                        </button>
                                        <button className='btn carousel__controls-btn'
                                                onClick={() => carousel.slideNext()}>
                                            <img className="carousel-megatron__controls-btn__img"
                                                 src={carouselMegatronArrowRight} alt=""
                                                 itemProp="image"/>
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={5}>

                            </Col>
                        </Row>
                    </Container>
                </div>


                <AliceCarousel
                    mouseTrackingEnabled
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    ref={(el) => (carousel = el)}
                    swipeDisabled={true}
                    onSlideChanged={onSlideChanged}
                >

                    {listMegatronCarousel.map(item => {
                        return (
                            <div
                                key={item.id}
                                className='carousel carousel__dark carousel-megatron hero-bg'
                                style={{
                                    backgroundImage: `url(${item.bgImage})`
                                }}
                            >

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
                                                    rel="noopener nofollow noreferrer"
                                                    onClick={(e) => {
                                                        handleShowModal('modal-redirect', 'Z_fondove.html', e)
                                                    }}
                                                >
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
            </div>
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

export default connect(
    null,
    {
        showModal
    }
)(CarouselMegatron);
