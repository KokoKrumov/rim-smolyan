import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg";
import infoIcon from "../../assets/images/info.svg";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {FormattedMessage} from 'react-intl';

class WorkInfoLine extends Component {
    getWorkingTime() {
        let result = {};
        const month = new Date().getMonth();
        if (month > 3 && month < 9) {
            result = {
                months: {
                    active: 'working.months.summer',
                    inactive: 'working.months.winter',
                },
                hours: '09:00 - 18:00',
            };
        } else if (month < 4 || month > 8) {
            result = {
                months: {
                    active: 'working.months.winter',
                    inactive: 'working.months.summer',
                },
                hours: '09:00 - 12:00 / 13:00 - 17:00',
            };
        }

        return result;
    }

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
                                <span style={{marginLeft: '11px'}}>
                                    <a href="/contact-us">
                                        <img className="" src={arrowRight} alt=""itemProp="image"/>
                                    </a>
                                </span>
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
