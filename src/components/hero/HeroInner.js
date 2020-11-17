import React, {Component} from 'react';
import vectors from '../../assets/images/Vector.png'
import Container from "react-bootstrap/cjs/Container";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class HeroInner extends Component {

    state = {
        title: this.props.title,
        link: this.props.subtitle,
        backLink: this.props.backLink ? this.props.backLink : false
    }

    renderHero = () => {
        const {intl} = this.props;
        return (
            <div className={`hero-inner__wrap${this.state.backLink ? '__sm' : ''}`}>
                <Container>
                    {
                        this.state.backLink
                            ?
                            <div className='back-link'>
                                <Link
                                    className="link cta_outline cta_outline__dark"
                                    to='/about-us'
                                    itemProp="url"
                                    target=""
                                    dangerouslySetInnerHTML={{__html: "<spam class='mr-3'><svg width=\"65\" height=\"8\" viewBox=\"0 0 65 8\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
                                            "                                            <path d=\"M0.646446 3.64645C0.451187 3.84171 0.451187 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM65 3.5L1 3.5V4.5L65 4.5V3.5Z\" />\n" +
                                            "                                        </svg></spam>" + intl.formatMessage({id: 'back'})}}
                                >
                                </Link>
                            </div>
                            :
                            null
                    }

                    <div>
                        <h1 className='h1'
                            dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.title})}}
                        >
                        </h1>
                        {
                            this.state.subtitle
                                ?
                                <p className='subtitle'
                                   dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.state.subtitle})}}
                                >
                                </p>
                                :
                                null
                        }

                    </div>
                </Container>
            </div>
        );
    }

    render() {
        return this.renderHero();
    }
}

export default injectIntl(HeroInner);
