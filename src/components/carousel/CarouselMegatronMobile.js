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

const items2 = [
    <div className="item" data-value="1">1</div>,
    <div className="item" data-value="2">2</div>,
    <div className="item" data-value="3">3</div>,
    <div className="item" data-value="4">4</div>,
    <div className="item" data-value="5">5</div>,
];

const thumbItems = (items, [setThumbIndex, setThumbAnimation]) => {
    return items.map((item, i) => (
        <div className="thumb" onClick={() => (setThumbIndex(i), setThumbAnimation(true))}>
            {item}
        </div>
    ));
};


function CarouselMegatron({listMegatronCarousel, showModal}) {

    let items = []
    if (listMegatronCarousel) {
        items = listMegatronCarousel.map(item => {
            return (
                <div>
                    {item.title}
                </div>
            )
        })

    }

    const [mainIndex, setMainIndex] = useState(0);
    const [mainAnimation, setMainAnimation] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [thumbs] = useState(thumbItems(items ? items : null, [setThumbIndex, setThumbAnimation]));

    const slideNext = () => {
        if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex + 1);
        }
    };

    const slidePrev = () => {
        if (!thumbAnimation && thumbIndex > 0) {
            setThumbAnimation(true);
            setThumbIndex(thumbIndex - 1);
        }
    };

    const syncMainBeforeChange = (e) => {
        setMainAnimation(true);
        if (e.type === 'action') {
            setThumbAnimation(true);
        }
    };

    const syncMainAfterChange = (e) => {
        setMainAnimation(false);

        if (e.type === 'action') {
            setThumbIndex(e.item);
            setThumbAnimation(false);
        } else {
            setMainIndex(thumbIndex);
        }
    };

    const syncThumbs = (e) => {
        setThumbIndex(e.item);
        setThumbAnimation(false);

        if (!mainAnimation) {
            setMainIndex(e.item);
        }
    };


    return [
        <AliceCarousel
            activeIndex={mainIndex}
            // animationType="fadeout"
            // animationDuration={800}
            disableDotsControls
            disableButtonsControls
            // infinite
            items={items}
            mouseTracking={false}
            onSlideChange={syncMainBeforeChange}
            onSlideChanged={syncMainAfterChange}
            touchTracking={!mainAnimation}
        />,
        <div className="thumbs">
            <AliceCarousel
                activeIndex={thumbIndex}
                autoWidth
                disableDotsControls
                disableButtonsControls
                items={thumbs}
                mouseTracking={false}
                onSlideChanged={syncThumbs}
                touchTracking={!mainAnimation}
            />
            <div className="btn-prev" onClick={slidePrev}>&lang;</div>
            <div className="btn-next" onClick={slideNext}>&rang;</div>
        </div>
    ]

}

export default connect(
    null,
    {
        showModal
    }
)(CarouselMegatron);
