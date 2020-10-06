import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import arrowRight from "../../assets/images/arrow-right.svg";
import infoIcon from "../../assets/images/info.svg";
import { FormattedMessage } from 'react-intl';

class WorkInfoLine extends Component {
    constructor(props) {
        super(props);
        this.date = new Date();
    }

    getWorkingHours() {
        let result = '';
        const month = this.date.getMonth();
        if (month > 3 && month < 9) {
            result = '09:00 - 18:00';
        } else if (month < 4 || month > 8) {
            result = '9:00 - 12:00; 13:00 - 17:00';
        }

        return result;
    }

    getWorkingMonths() {
        let result = [];
        const month = this.date.getMonth();
        if (month > 3 && month < 9) {
            result = [4, 8];
        } else if (month < 4 || month > 8) {
            result = [9, 3];
        }

        return result;
    }

    getNonWorkingMonths() {
        let result = [];
        const month = this.date.getMonth();
        if (month > 3 && month < 9) {
            result = [4, 8];
        } else if (month < 4 || month > 8) {
            result = [9, 3];
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
                                Работно време <span style={{marginLeft: '6px'}}>
                                    (<FormattedMessage id="months.full"
                                        values={{
                                            b: chunks => <b>{chunks}</b>,
                                            icon: <svg />,
                                        }}
                                    /> - <FormattedMessage id="months.full[this.getWorkingMonths()[1]]" />)
                                </span>:
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text info-line__text-bold'>
                                Вторник - Неделя <span style={{marginLeft: '1rem'}}>{this.getWorkingHours()}</span>
                            </p>
                        </div>

                        <div className='info-line__item'>
                            <p className='info-line__text'>
                                Октомври - Април
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
