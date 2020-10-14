import React, {Component} from 'react';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from 'react-redux'
import {fetchNews} from "../../../actions";
import Socials from "../../socials/socials";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";

class Contacts extends Component {

    state = {}


    render() {
        return (
            <div className='contacts-page__wrap'>
                <HeroInner
                    title={'Контакти'}
                    subtitle={''}
                />

                <div className='contacts__wrap'>
                    <Container className=''>
                        <Row>
                            <Col lg={3}>
                                <address className=''>
                                    <ul>
                                        <li>
                                            <h4 className='h4 address-label'>
                                                Адрес:
                                            </h4>
                                            <p className='address-text'>
                                                гр. Смолян 4700 <br/>
                                                ул.”Дичо Петров” №5
                                            </p>
                                        </li>
                                        <li>
                                            <h4 className='h4 address-label'>
                                                Информация:
                                            </h4>
                                            <p className='address-text'>
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
                                        <li>
                                            <h4 className='h4 address-label'>
                                                Пишете ни на:
                                            </h4>
                                            <p className='address-text'>
                                                <ul>
                                                    <li>
                                                        <a className="link" href="tel:+030162727" itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            museum-sm@mail.bg
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="link" href="tel:+0879111915" itemProp="url"
                                                           target=""
                                                           rel="noopener nofollow noreferrer">
                                                            rim.smolyan@gmail.com
                                                        </a>
                                                    </li>
                                                </ul>
                                            </p>
                                        </li>
                                        <li>
                                            <Socials/>
                                        </li>
                                    </ul>
                                </address>
                            </Col>
                            <Col lg={3}>
                                <div>
                                    <div>
                                        <h4 className='h4 address-label'>
                                            Работно време:
                                        </h4>
                                        <p className='address-text__sm'>
                                            Вторник - Неделя
                                        </p>
                                    </div>
                                    <div className='time-period__wrap'>
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
                                    </div>
                                    <div>
                                        <p className='paragraph-3'>
                                            Понеделник е санитарен ден.
                                            Музеят не работи за посетители на официалните празници на Република
                                            България.
                                        </p>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={4}>
                                <div>
                                    <h4 className='h4 address-label'>
                                        Обратна връзка
                                    </h4>
                                    <p className='paragraph-3'>
                                        Споделете вашите впечатления, препоръки или направете запитване.
                                    </p>
                                    <div>
                                        <Form>
                                            <Form.Group controlId="formBasicText">
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Имена" />
                                                <Form.Text className="text-muted d-none d-error">
                                                    Това поле е задължително
                                                </Form.Text>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicText">
                                                <Form.Control
                                                    required
                                                    type="email"
                                                    placeholder="Имейл адрес" />
                                                <Form.Text className="text-muted d-none d-error">
                                                    Това поле е задължително
                                                </Form.Text>
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
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
