import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg"
import infoIcon from "../../assets/images/info.svg"

class WorkInfoLine extends Component {
    render() {
        return (
            <div className='info-line info-line__red'>
                <Container>
                    <div className='info-line__content-wrap'>
                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold text-uppercase'>
                                Работно време <span style={{marginLeft: '6px'}}>(Май - Септември)</span>:
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold'>
                                Вторник - Неделя <span style={{marginLeft: '1rem'}}>09:00 - 12:00</span>
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text'>
                                Април - Октомври
                                <span style={{marginLeft: '11px'}}><img className="" src={arrowRight} alt="" itemProp="image"/></span>
                                <span style={{marginLeft: '2rem'}}><img className="" src={infoIcon} alt="" itemProp="image"/></span>
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default WorkInfoLine;
