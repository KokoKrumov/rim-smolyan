import React, {Component} from 'react';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from 'react-redux'
import {fetchNews} from "../../../actions";
import Socials from "../../socials/socials";
import Form from 'react-bootstrap/Form'
import mapShot from '../../../assets/images/map-shot.png'

class Contacts extends Component {

    state = {}


    render() {
        return (
            <div className='contacts-page__wrap'>
                <HeroInner
                    title={'Контакти'}
                    subtitle={''}
                />

                <div className='contacts contacts__wrap'>
                    <Container className=''>
                        <Row className='contacts__row'>
                            <Col lg={3}>
                                <address className=''>
                                    <ul className='address__list'>
                                        <li className='address__list-item'>
                                            <h4 className='h4 contacts__address-label'>
                                                Адрес:
                                            </h4>
                                            <p className='contacts__address-text'>
                                                гр. Смолян 4700 <br/>
                                                ул.”Дичо Петров” №5
                                            </p>
                                        </li>
                                        <li className='address__list-item'>
                                            <h4 className='h4 contacts__address-label'>
                                                Информация:
                                            </h4>
                                            <p className='contacts__address-text'>
                                                <ul>
                                                    <li>
                                                        <a className="link" href="tel:+030162727" itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            0301/6 27 27
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="link" href="tel:+0879111915" itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            0879 111 915
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="link" href="tel:+0879111913" itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            0879 111 913
                                                        </a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </li>
                                        <li className='address__list-item'>
                                            <h4 className='h4 contacts__address-label'>
                                                Пишете ни на:
                                            </h4>
                                            <p className='contacts__address-text'>
                                                <ul>
                                                    <li>
                                                        <a className="link" href="mailto:museum-sm@mail.bg"
                                                           itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            museum-sm@mail.bg
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="link" href="mailto:rim.smolyan@gmail.com"
                                                           itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            rim.smolyan@gmail.com
                                                        </a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </li>
                                        <li className='address__list-item'>
                                            <Socials/>
                                        </li>
                                    </ul>
                                </address>
                            </Col>
                            <Col lg={3}>
                                <ul className='address__list'>
                                    <li className='address__list-item'>
                                        <h4 className='h4 contacts__address-label'>
                                            Работно време:
                                        </h4>
                                        <p className='contacts__address-text'>
                                            Вторник - Неделя
                                        </p>
                                    </li>
                                    <li className='address__list-item time-period__wrap'>
                                        <h6 className='time-period__title'>
                                            Май - Септември
                                        </h6>
                                        <p className='time-period__text'>
                                            09:00 - 18:00
                                        </p>
                                        <hr/>
                                        <h6 className='time-period__title'>
                                            Октомври - Април
                                        </h6>
                                        <p className='time-period__text'>
                                            09:00 - 12:00 13:00 - 18:00
                                        </p>
                                    </li>
                                    <li className='address__list-item'>
                                        <p className='paragraph-3'>
                                            Понеделник е санитарен ден.
                                            Музеят не работи за посетители на официалните празници на Република
                                            България.
                                        </p>
                                    </li>
                                </ul>
                            </Col>
                            <Col lg={4}>
                                <div>
                                    <h4 className='h4 contacts__address-label'>
                                        Обратна връзка
                                    </h4>
                                    <p className='paragraph-3'>
                                        Споделете вашите впечатления, препоръки или направете запитване.
                                    </p>
                                    <div>
                                        <Form className='form__wrap'>
                                            <Form.Group controlId="formBasicText">
                                                <Form.Control
                                                    disabled
                                                    required
                                                    type="text"
                                                    placeholder="Имена"/>
                                                <Form.Text className="text-muted d-none d-error">
                                                    Това поле е задължително
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicText">
                                                <Form.Control
                                                    disabled
                                                    required
                                                    type="email"
                                                    placeholder="Имейл адрес"/>
                                                <Form.Text className="text-muted d-none d-error">
                                                    Това поле е задължително
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                                <Form.Control
                                                    disabled
                                                    as="textarea"
                                                    rows={3}/>
                                            </Form.Group>
                                            <div className='text-right'>
                                                <button className="link cta_outline cta_outline__dark hvr-underline-from-center"
                                                   disabled>
                                                    Изпрати
                                                </button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className='contacts__row'>
                            <Col lg={7}>
                                <div className='contacts__map__wrap'>
                                    <a
                                        className="link"
                                        target='_blank'
                                        href="https://www.google.com/maps/place/Regional+History+Museum+Stoyu+Shishkov/@41.5760979,24.7144959,18z/data=!4m5!3m4!1s0x14ac5a06dc1240f7:0x35e14604588eb47d!8m2!3d41.5762665!4d24.7147483?hl=en-GB"
                                        rel="noopener nofollow noreferrer">
                                        <img className="img-fluid" src={mapShot} alt="" itemProp="image"/>
                                    </a>
                                </div>
                            </Col>
                            <Col lg={4}>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news)
    };
}

export default connect(
    mapStateToProps,
    {
        fetchNews
    }
)(Contacts);
