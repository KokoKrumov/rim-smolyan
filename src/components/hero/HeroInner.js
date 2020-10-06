import React, {Component} from 'react';
import vectors from '../../assets/images/Vector.png'
import Container from "react-bootstrap/cjs/Container";

class HeroInner extends Component {

    renderHero = () => {
        return (
            <div className='hero-inner__wrap'>
                <Container>
                    <div>
                        <h1 className='h1'>
                            {this.props.title}
                        </h1>
                        <p className='subtitle'>
                            {this.props.subtitle}
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    render() {
        return this.renderHero();
    }
}

export default HeroInner;
