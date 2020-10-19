import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg";
import infoIcon from "../../assets/images/info.svg";
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class WorkInfoLine extends Component {
    render() {
        return (
            <div className='info-line info-line__red'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold text-uppercase'>
                                Работно време <span style={{marginLeft: '6px'}}>( Октомври - Април )</span>:
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold'>
                                Вторник - Неделя <span style={{marginLeft: '1rem'}}>09:00 - 12:00 / 13:00 - 17:00</span>
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text'>
                                Май  - Септември
                                <span style={{marginLeft: '11px'}}><img className="" src={arrowRight} alt=""
                                                                        itemProp="image"/></span>

                                <OverlayTrigger
                                    key='top'
                                    placement='top'
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            Понеделник е санитарен ден. (Можете да посетите музея, но предварително
                                            молим да ни извините, ако в момента на Вашето посещение се пренареждат и
                                            почистват зали.)
                                        </Tooltip>
                                    }
                                >
                                    <span style={{marginLeft: '2rem', cursor: 'pointer'}}><img className="" src={infoIcon} alt=""
                                                                            itemProp="image"/></span>
                                </OverlayTrigger>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default WorkInfoLine;
