import React, {Component} from 'react';
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import {connect} from 'react-redux';
import {fetchNews} from "../../../actions";
import aboutUsBg from "../../../assets/images/about-us-page_bg.png";

class AboutUs extends Component {

    state = {}


    render() {
        return (
            <div className='about-us-page'>
                <div className='hero__wrap hero2cols'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${aboutUsBg})`
                        }}
                    >
                        <Container>
                            <Row>
                                <Col>
                                    <h1 className='h1'>
                                        Мисия
                                    </h1>
                                </Col>
                            </Row>
                            <Row className='justify-content-between'>
                                <Col lg={4}>
                                    <p className='about-us-page__text__bold'>
                                        Създаден през 1935 г. от <span className='color-red' onClick={()=>{}}>Стою Неделев ШИШКОВ</span> – родоповед, учител, издател,
                                        музеен деец и общественик с европейски измерения, Историческият музей в Смолян е
                                        най-големият музей, съхраняващ знаците на паметта на населението, обитавало
                                        централната част на Родопската област през различните исторически епохи.
                                    </p>

                                </Col>
                                <Col lg={6}>
                                    <p className='paragraph-2'>
                                        Регионален исторически музей “Стою Шишков” днес носи с достойнство името на своя
                                        основател и провежда политиката по издирване, изучаване, опазване и
                                        популяризиране
                                        на движимите паметници на историята, бита и културата на Среднородопския край.
                                    </p>
                                    <p className='paragraph-2'>
                                        Чрез своите уникални колекции, показващи цялото културно многообразие и
                                        хилядолетните традиции, чрез изследователските и популяризаторските си ресурси,
                                        изграждайки мрежа от успешни партньорства, музеят работи в полза на обществото –
                                        за неговото духовно обогатяване и вдъхновение чрез завръщане към корените и
                                        опознаване на различни култури.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
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
)(AboutUs);
