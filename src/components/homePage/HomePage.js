import React, {Component} from 'react';
import heroImage from "../../assets/images/baseHero.png";
import Hero from "../hero/Hero";
import WorkInfoLine from "../workInfoLine/WorkInfoLine"
import NewsAndEventsList from "../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";

class HomePage extends Component {

    render() {
        return (
            <div className='home-page__wrap'>
                <Hero
                    Image={heroImage}
                    isMainHero={true}
                    title={'Средните Родопи'}
                    subtitle={'от праисторическите времена до съвременността'}
                    subtitleSm={'Рaзгледайте нашите фондове'}
                />
                <WorkInfoLine/>
                <div className='nae-container'>
                    <Container>
                        <div>
                            <div className='nae__title-line'>
                                <h1 className='h1'>
                                    Новини и Събития
                                </h1>
                                <div className='nae__title-line__link'>
                                    <Link
                                        className="link cta_outline cta_outline__dark hvr-underline-from-right"
                                        to="#"
                                        itemProp="url"
                                        target=""
                                       rel="noopener nofollow noreferrer">
                                        вижте всички
                                    </Link>

                                </div>
                            </div>
                            <div>
                                <NewsAndEventsList/>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className='nae-container'>
                    <Container>
                        <div>
                            <div className='nae__title-line'>
                                <h1 className='h1'>
                                    За нас
                                </h1>
                                <div className='nae__title-line__link'>
                                    <Link
                                        className="link cta_outline cta_outline__dark hvr-underline-from-right"
                                        to="#"
                                        itemProp="url"
                                        target=""
                                       rel="noopener nofollow noreferrer">
                                        вижте всички
                                    </Link>

                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default HomePage;
