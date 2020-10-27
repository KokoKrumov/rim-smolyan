import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg";
import infoIcon from "../../assets/images/info.svg";
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {FormattedMessage} from 'react-intl';

class aboutInfoLine extends Component {

    render() {
        return (
            <div className='info-line info-line__red'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold text-uppercase'>
                                <FormattedMessage id="working.time"/>
                                <span style={{marginLeft: '6px'}}>( <FormattedMessage id={this.getWorkingTime().months.active}/> )</span>:
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold'>
                                <FormattedMessage id="working.days"/>
                                <span style={{marginLeft: '1rem'}}>{this.getWorkingTime().hours}</span>
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text'>
                                <FormattedMessage id={this.getWorkingTime().months.inactive}/>
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

export default aboutInfoLine;
