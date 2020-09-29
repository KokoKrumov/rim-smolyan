import React, {Component} from 'react';
import heroImage from "../../assets/images/baseHero.png";
import aboutUsImage from "../../assets/images/about_us_section_bg.png";
import Hero from "../hero/Hero";
import WorkInfoLine from "../workInfoLine/WorkInfoLine"
import NewsAndEventsList from "../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";

class HomePage extends Component {

    state = {
        bgHero: null,
        bgAboutUs: null
    }

    componentDidMount() {
        this.setState({bgHero: heroImage})
        this.setState({bgAboutUs: aboutUsImage})
    }

    render() {
        return (
            <div className='home-page__wrap'>
                <Hero
                    Image={this.state.bgHero}
                    isMainHero={true}
                    title={'Средните Родопи'}
                    subtitle={'от праисторическите времена до съвременността'}
                    subtitleSm={'Рaзгледайте нашите фондове'}
                />
                <WorkInfoLine/>

                <div className='nae-container nae-container_content-dark'>
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

                <div className='carousel carousel__megatron'>
                    
                </div>

                <div
                    className='nae-container nae-container_content-dark hero-bg'
                    style={{
                        backgroundImage: `url(${this.state.bgAboutUs})`
                    }}
                >
                    <Container>
                        <div>
                            <div className='nae__title-line'>
                                <h1 className='h1'>
                                    За нас
                                </h1>

                            </div>
                            <div>
                                <p className='paragraph-2 col-count-2'>
                                    Регионален исторически музей „Стою Шишков” – Смолян е най-големият музей в Средните
                                    Родопи. Съхранява веществената памет на обитателите на най-високите части на
                                    планината през различните исторически периоди, от праисторическите времена до
                                    съвременността.
                                    Помещава се в специално построена сграда, ситуирана в модерния административен
                                    център на града и разполага с богати и разнообразни колекции, възлизащи над 150 хил.
                                    единици.
                                    <div style={{marginTop: '2rem'}}>
                                        <Link
                                            className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                            to="#"
                                            itemProp="url"
                                            target=""
                                            rel="noopener nofollow noreferrer">
                                            вижте повече
                                        </Link>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default HomePage;
