import React, {useEffect, useState} from 'react';
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {showModal} from "../../actions";
import {isMobileScreen} from "../../utilities/browser";
import {isTabletScreen} from "../../utilities/browser";
import Carousel from 'react-elastic-carousel';
import ReactCSSTransitionReplace from 'react-css-transition-replace';

function CarouselMegatron({listMegatronCarousel, showModal}) {
    const [item, setItem] = useState(0);
    const [carouselBg, setCarouselBg] = useState('')
    const [carouselTitle, setCarouselTitle] = useState('')
    const [carouselDescription, setCarouselDescription] = useState('')
    const [carouselType, setCarouselType] = useState('')
    let carousel1 = React.createRef();

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


                                      <div className="row">
                                          <Carousel
                                              ref={ref => (carousel1 = ref)}
                                              isRTL={false}
                                              itemsToShow={1}
                                              initialActiveIndex={item}
                                              showArrows={false}
                                              pagination={false}
                                              onChange={(currentItem, pageIndex) => {
                                                  goto(pageIndex)
                                              }}

                                              outerSpacing={30}
                                              itemPadding={[0, 15]}
                                          >
                                              {listMegatronCarousel.map((item, index) => {
                                                  return (
                                                      <div className='carousel-megatron__img-wrap' key={index}>
                                                          <img className="w-100" src={item.image} alt="" itemProp="image"/>

                                                      </div>
                                                  )
                                              })}
                                          </Carousel>
                                      </div>
                                        <p className='carousel-megatron__description paragraph-3'>
                                            {carouselDescription}
                                        </p>


                                        <div className='wrap-controls__lg'>
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
