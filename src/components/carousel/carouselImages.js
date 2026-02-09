import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { showModal } from "../../actions";
import carouselImagesArrowLeftDark from "../../assets/images/carousel__left-arrow__dark.svg";
import carouselImagesArrowRightDark from "../../assets/images/carousel__right-arrow__dark.svg";
import AliceCarousel from "react-alice-carousel";
import { isMobileScreen, isTabletScreen } from "../../utilities/browser";

function CarouselImages({ listImages }) {
  const handleOnDragStart = (e) => e.preventDefault();
  const [item, setItem] = useState(0);

  const [isMobileScreenV, setIsMobileScreen] = React.useState(isMobileScreen());
  const carousel = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(isMobileScreen());
    }

    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  function onSlideChanged(e) {
    setItem(e.item);
  }

  const carouselItems = listImages
    ? listImages.map((item) => (
        <div
          key={item.id}
          className="carousel carousel-building__item"
          onDragStart={handleOnDragStart}
          style={isMobileScreenV ? { padding: '0 10px' } : {}}
        >
          <img
            className="img-fluid"
            src={item.image}
            alt=""
            itemProp="image"
          />
        </div>
      ))
    : [];

  if (listImages) {
    return (
      <React.Fragment>
        {!isMobileScreenV && (
          <div className="carousel-images__controls-wrap  carousel__controls-wrap">
            <button
              className="btn carouselImages__controls-btn carousel__controls-btn"
              onClick={() => carousel.current?.slidePrev()}
            >
              <img
                className="carousel-images-btn__img"
                src={carouselImagesArrowLeftDark}
                alt=""
                itemProp="image"
              />
            </button>
            <button
              className="btn carousel-images-btn carousel__controls-btn"
              onClick={() => carousel.current?.slideNext()}
            >
              <img
                className="carousel-images__controls-btn__img"
                src={carouselImagesArrowRightDark}
                alt=""
                itemProp="image"
              />
            </button>
          </div>
        )}

        <div className="carousel-images__wrap" style={isMobileScreenV ? { padding: '0 20px' } : {}}>
          <AliceCarousel
            ref={carousel}
            items={carouselItems}
            activeIndex={item}
            disableButtonsControls
            disableDotsControls
            mouseTracking
            onSlideChanged={onSlideChanged}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <p>Loading ...</p>
      </div>
    );
  }
}

export default connect(null, {
  showModal,
})(CarouselImages);
