import React, {useEffect, useState} from 'react';
import AliceCarousel from 'react-alice-carousel'
import {connect} from "react-redux";
import {showModal} from "../../actions";
import carouselImagesArrowLeftDark from "../../assets/images/carousel__left-arrow__dark.svg";
import carouselImagesArrowRightDark from "../../assets/images/carousel__right-arrow__dark.svg";
import Carousel from "react-elastic-carousel";
import {isMobileScreen, isTabletScreen} from "../../utilities/browser";

function CarouselImages({listImages}) {
    const handleOnDragStart = (e) => e.preventDefault()
    const [item, setItem] = useState(1);

    const [isMobileScreenV, setIsMobileScreen] = React.useState(isMobileScreen())
    let carousel = React.createRef();

    useEffect(() => {
        function handleResize() {
            setIsMobileScreen(isMobileScreen())
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })


    function onSlideChanged(e) {
        setItem(e.item + 1)
    }

    if (listImages) {
        return (
            <React.Fragment>
                <div className='carousel-images__controls-wrap  carousel__controls-wrap'>
                    <button className='btn carouselImages__controls-btn carousel__controls-btn'
                            onClick={() => carousel.slideNext()}>
                        <img className="carousel-images-btn__img"
                             src={carouselImagesArrowLeftDark} alt=""
                             itemProp="image"/>
                    </button>
                    <button className='btn carousel-images-btn carousel__controls-btn'
                            onClick={() => carousel.slidePrev()}>
                        <img className="carousel-images__controls-btn__img"
                             src={carouselImagesArrowRightDark} alt=""
                             itemProp="image"/>
                    </button>
                </div>

                <div className='carousel-images__wrap'>
                    <Carousel
                        ref={ref => (carousel = ref)}
                        isRTL={true}
                        itemsToShow={1}
                        initialActiveIndex={item}
                        showArrows={false}
                        pagination={false}
                        outerSpacing={isMobileScreenV ? 20 : 0}
                        itemPadding={isMobileScreenV ? [0, 10] : []}
                    >

                        {listImages.map(item => {
                            return (
                                <div
                                    key={item.id}
                                    className='carousel carousel-building__item'
                                    onDragStart={handleOnDragStart}
                                >
                                    <img className="img-fluid" src={item.image} alt="" itemProp="image"/>

                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </React.Fragment>
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
)(CarouselImages);
