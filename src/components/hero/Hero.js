import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";

class Hero extends Component {

    renderHero = () => {
            return (
                <div className='hero__wrap'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${this.props.Image})`
                        }}
                    >
                            <h1 className='display'>
                                {this.props.title}
                            </h1>
                            <p className='subtitle'>
                                {this.props.subtitle}
                            </p>
                            <p className='subtitle subtitle__sm '>
                                <Link
                                    className="link cta_outline cta_outline__light hvr-underline-from-center"
                                    to="#"
                                    itemProp="url"
                                    target=""
                                    rel="noopener nofollow noreferrer">
                                    {this.props.subtitleSm}
                                </Link>
                            </p>

                    </div>

                </div>
            );
    }

    render() {
        return this.renderHero();
    }
}

export default Hero;
