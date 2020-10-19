import React, {Component} from 'react';
import vectors from '../../assets/images/Vector.png'
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Hero extends Component {

    renderHero = () => {
            return (
                <div className='hero__wrap hero2cols'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${this.props.Image})`
                        }}
                    >
                        <Container>
                            <Row>
                                <Col>
                                    <h1 className='h1'>
                                        {this.props.title}
                                    </h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className='subtitle'>
                                        {this.props.subtitle}
                                    </p>

                                </Col>
                                <Col>
                                    <p className='paragraph-2'>
                                        <Link
                                            className="link cta_outline cta_outline__light hvr-underline-from-center"
                                            to="#"
                                            itemProp="url"
                                            target=""
                                            rel="noopener nofollow noreferrer">
                                            {this.props.subtitleSm}
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Container>

                    </div>

                </div>
            );
    }

    render() {
        return this.renderHero();
    }
}

export default Hero;
