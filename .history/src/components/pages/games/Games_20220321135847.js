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
                            <div>
                                <img className="img-fluid" src={"../images/games/gamesImg.svg"} alt="igri na rodoliubieto" itemProp="image"/>
                            </div>
                        </div>
                    </Container>
                </div>
                <main className='prices-page__main'>
                    <section>
                        <Container className='position-relative'>
                            <Row>
                                <Col xs={12} sm={8}>
                                    <div className='regulation-text'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'regulation-text'})}}
                                    />
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
