import React, {Component} from 'react';
import {injectIntl} from 'react-intl';
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Col from "react-bootstrap/cjs/Col";
import Row from "react-bootstrap/cjs/Row";

class Regulation extends Component {
    componentDidMount(){
        window.scrollTo({top: 0})
    }
    render() {
        const {intl} = this.props;
        return (
            <div className='services-page'>
                <HeroInner
                    title={'regulation'}
                />
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



export default injectIntl(Regulation);
