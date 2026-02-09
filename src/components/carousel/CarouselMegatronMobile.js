import React, {useEffect, useRef, useState} from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import {isMobileScreen} from "../../utilities/browser";
import {isTabletScreen} from "../../utilities/browser";
import AliceCarousel from 'react-alice-carousel';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

function CarouselMegatron({listMegatronCarousel, showModal}) {
    const [item, setItem] = useState(0);
    const [carouselBg, setCarouselBg] = useState('')
    const [carouselTitle, setCarouselTitle] = useState('')
    const [carouselDescription, setCarouselDescription] = useState('')
    const [carouselType, setCarouselType] = useState('')
    const carousel1 = useRef(null);

    useEffect(() => {

        setCarouselBg(listMegatronCarousel[item].bgImage);
        setCarouselTitle(listMegatronCarousel[item].title);
        setCarouselDescription(listMegatronCarousel[item].description);
        setCarouselType(listMegatronCarousel[item].type);

    })

    function goto(index) {
        setItem(index)
    }

    function handleShowModal(data, url, e) {
        e.preventDefault();
        showModal(data, url)
    }

    const carouselItems = listMegatronCarousel
        ? listMegatronCarousel.map((item, index) => (
            <div className='carousel-megatron__img-wrap' key={index} style={{ padding: '0 15px' }}>
                <img className="w-100" src={item.image} alt="" itemProp="image"/>
            </div>
        ))
        : [];

    if (listMegatronCarousel) {

        return (
            <div className='carousel-megatron__mobile__bg'>
                <ReactCSSTransitionReplace
                    transitionName="cross-fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    <div className='carousel-megatron__wrap carousel-megatron__mobile' key={item} >
                        <div
                            key={item.id}
                            className='carousel carousel__dark carousel-megatron hero-bg'
                            style={{
                                backgroundImage: `url(${carouselBg})`
                                // backgroundColor: `#251A20`
                            }}
                        >
                            <Container>
                                <Row
                                    key={item.id}
                                    className="carousel-megatron__row"
                                >
                                    <Col lg={6}>

                                        <div className='carousel__title-wrap__mobile'>
                                            <h3 className='carousel__title'>
                                                <ReactCSSTransitionReplace
                                                    transitionName="cross-fade"
                                                    transitionEnterTimeout={500}
                                                    transitionLeaveTimeout={500}>
                                            <span key={item}>
                                                {carouselTitle}

                                            </span>
                                                </ReactCSSTransitionReplace>
                                            </h3>
                                            <p className='carousel__type'>
                                                {carouselType}
                                            </p>
                                        </div>

                                    </Col>
                                    <Col lg={5}>


                                      <div className="row" style={{ padding: '0 30px' }}>
                                          <AliceCarousel
                                              ref={carousel1}
                                              items={carouselItems}
                                              activeIndex={item}
                                              disableButtonsControls
                                              disableDotsControls
                                              mouseTracking
                                              onSlideChanged={(e) => {
                                                  goto(e.item)
                                              }}
                                          />
                                      </div>
                                        <p className='carousel-megatron__description paragraph-3'>
                                            {carouselDescription}
                                        </p>


                                        <div className='wrap-controls__lg'>
                                            <p className='carousel__data-link'>
                                                <Link
                                                    style={{marginTop: '2rem'}}
                                                    className="link cta_outline cta_outline__light hvr-underline-from-left"
                                                    to="/collections"
                                                    itemProp="url"
                                                    target=""
                                                    rel="noopener nofollow noreferrer"
                                                    // onClick={(e) => {
                                                        // handleShowModal('modal-redirect', 'Z_fondove.html', e)
                                                    // }}
                                                >
                                                    към фондове
                                                </Link>
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    </div>
                </ReactCSSTransitionReplace>
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
