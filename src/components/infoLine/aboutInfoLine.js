import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg";
import infoIcon from "../../assets/images/info.svg";
import Tooltip from 'react-bootstrap/Tooltip';
import Overlay from 'react-bootstrap/Overlay'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {FormattedMessage} from 'react-intl';

class AboutInfoLine extends Component {

    render() {
        return (
            <div className='info-line info-line__red'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold text-uppercase'>
                                <FormattedMessage id="about-us.info-line.support"/>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default AboutInfoLine;
