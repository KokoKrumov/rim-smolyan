import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";

class Games extends Component {
    render() {
        const {intl} = this.props;
        return (
            <div className='services-page'>
                <div className={`hero-inner__wrap`}>
                    <Container>
                        <div className='games-title__wrap'>
                            <h1 className='h1'
                                dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'games-title'})}}
                            />
                            <div className='games-title-img__wrap'>
                                <img className="img-fluid" src={"../images/games/gamesImg.png"} alt="igri na rodoliubieto" itemProp="image"/>
                            </div>
                        </div>
                    </Container>
                </div>
                <main className='prices-page__main'>
                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={8} sm={8}>
                                    <h1 className='h1'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan'})}}
                                    />
                                    <p className='paragraph-2' dangerouslySetInnerHTML={{__html: 'first-time-in-smolyan-first-paragraph'}}/>
                                    <h3 className='h3'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan-sub-title'})}}
                                    />
                                    <p className='paragraph-2' dangerouslySetInnerHTML={{__html: 'first-time-in-smolyan-sub-title-next-text'}}/>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
            </div>
        )
    }
}



export default injectIntl(Games);
