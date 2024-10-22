import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";
import {Link} from "react-router-dom";

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
                                <Col xs={12} sm={9}>
                                    <h1 className='h1'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan'})}}
                                    />
                                    <p className='paragraph-2' dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan-first-paragraph'})}}/>
                                   <div className='mt-40'>
                                        <h3 className='h3'
                                            dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan-sub-title'})}}
                                        />
                                   </div>
                                    <div dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'first-time-in-smolyan-sub-title-next-text'})}}/>
                                    <p className='mt-60'>
                                        <Link
                                            className="link cta_outline cta_outline__dark link-underline m-0 d-inline-block"
                                            to={'/museum-games/regulation'}
                                            itemProp="url"
                                            target=""
                                            rel="noopener nofollow noreferrer"
                                            dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'regulation'})}}>
                                        </Link>
                                    </p>
                                    <div className='mt-120'>
                                        <h2 className='h2'
                                        dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'museum-games-title'})}}
                                        />
                                        <div dangerouslySetInnerHTML={{__html: intl.formatMessage({id: 'museum-games-text'})}}/>
                                    </div>
           
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
