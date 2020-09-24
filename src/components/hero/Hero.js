import React, {Component} from 'react';
import vectors from '../../assets/images/Vector.png'

class Hero extends Component {

    renderHero = () => {
        if (this.props.isMainHero) {
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
                            <span className='bordered__light'>
                                {this.props.subtitleSm}
                            </span>
                        </p>
                    </div>

                </div>
            );
        } else {
            return (
                <div className='hero'>

                </div>
            );
        }
    }

    render() {
        return this.renderHero();
    }
}

export default Hero;
