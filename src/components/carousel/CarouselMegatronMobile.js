import React, {useMemo, useRef, useState} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import {isMobileScreen} from "../../utilities/browser";
import {isTabletScreen} from "../../utilities/browser";
import _AliceCarousel from 'react-alice-carousel';
const AliceCarousel = _AliceCarousel.default ?? _AliceCarousel;
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useInView } from "../../utilities/useInView";

function CarouselMegatron({listMegatronCarousel, showModal}) {
    const [item, setItem] = useState(0);
    const [viewportRef, visible] = useInView();
    const slide = listMegatronCarousel?.[item];
    const carousel1 = useRef(null);
    // React 19 removed findDOMNode, so every CSSTransition needs its own nodeRef per key
    const bgNodeRef = useMemo(() => React.createRef(), [item]);
    const titleNodeRef = useMemo(() => React.createRef(), [item]);

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
                <img className="w-100" src={item.image} alt="" itemProp="image" loading="lazy" decoding="async"/>
            </div>
        ))
        : [];

    if (listMegatronCarousel) {

        return (
            <div ref={viewportRef} className='carousel-megatron__mobile__bg'>
                <div className='carousel-megatron__wrap carousel-megatron__mobile'>
                    <div
                        key={item.id}
                        className='carousel carousel__dark carousel-megatron'
                        style={{position: 'relative'}}
                    >
                        {/* only the background layer swaps, so the slide images stay mounted */}
                        <SwitchTransition mode="in-out">
                            <CSSTransition key={item} nodeRef={bgNodeRef} classNames="cross-fade" timeout={500}>
                                <div
                                    ref={bgNodeRef}
                                    className='hero-bg'
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                        backgroundImage: visible ? `url(${slide.bgImage})` : undefined
                                    }}
                                />
                            </CSSTransition>
                        </SwitchTransition>

                        <Container style={{position: 'relative', zIndex: 1}}>
                                <Row
                                    key={item.id}
                                    className="carousel-megatron__row"
                                >
                                    <Col lg={6}>

                                        <div className='carousel__title-wrap__mobile'>
                                            <h3 className='carousel__title'>
                                                <SwitchTransition mode="out-in">
                                                    <CSSTransition key={item} nodeRef={titleNodeRef} classNames="cross-fade" timeout={500}>
                                            <span ref={titleNodeRef}>
                                                {slide.title}

                                            </span>
                                                    </CSSTransition>
                                                </SwitchTransition>
                                            </h3>
                                            <p className='carousel__type'>
                                                {slide.type}
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
                                            {slide.description}
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
            </div>
        )
    } else {
        return (
            <div ref={viewportRef}>
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
