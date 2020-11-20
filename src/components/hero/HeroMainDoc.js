import React, {Component} from 'react';
import vectors from '../../assets/images/Vector.png'
import {Link} from "react-router-dom";
import injectIntl from "react-intl/lib/src/components/injectIntl";

class Hero extends Component {

    renderHero = () => {
        const {intl} = this.props;
            return (
                <div className='hero__wrap'>
                    <div
                        className='hero hero-bg'
                        style={{
                            backgroundImage: `url(${this.props.Image})`
                        }}
                    >
                        <h3 className='h3'
                            dangerouslySetInnerHTML={{__html: intl.formatMessage({id: this.props.title})}}
                        >
                        </h3>
                        {/*<p className='subtitle'>*/}
                        {/*    {this.props.subtitle}*/}
                        {/*</p>*/}
                        {/*<p className='subtitle subtitle__sm '>*/}
                        {/*    <Link*/}
                        {/*        className="link cta_outline cta_outline__light hvr-underline-from-center"*/}
                        {/*        to="#"*/}
                        {/*        itemProp="url"*/}
                        {/*        target=""*/}
                        {/*        rel="noopener nofollow noreferrer">*/}
                        {/*        {this.props.subtitleSm}*/}
                        {/*    </Link>*/}
                        {/*</p>*/}

                    </div>

                </div>
            );
    }

    render() {
        return this.renderHero();
    }
}

export default injectIntl(Hero);
