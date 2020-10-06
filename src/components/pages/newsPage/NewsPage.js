import React, {Component} from 'react';
import heroImage from "../../assets/images/baseHero.png";
import aboutUsImage from "../../assets/images/about_us_section_bg.png";
import Hero from "../hero/Hero";
import WorkInfoLine from "../workInfoLine/WorkInfoLine"
import NewsAndEventsList from "../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/cjs/Row";
import imageEvent_1 from "../../assets/images/imageEvent.png";
import imageEvent_2 from "../../assets/images/imageEvent2.png";
import imageEvent_3 from "../../assets/images/imageEvent3.png";
import imageItem_1 from "../../assets/images/img-money.png";
import imageItem_2 from "../../assets/images/img-weapon.png";
import imageItem_3 from "../../assets/images/img-shlem.png";
import bgCarousel from "../../assets/images/bg-shlem.png";
import CarouselMegatron from "../carousel/carouselMegatron";

let listOfNewsAndEvents = [
    {
        id: 1,
        dateM: 'Октомври',
        dateD: '18',
        image: imageEvent_1,
        title: 'На пататнки и песни в музея'
    },
    {
        id: 2,
        dateM: 'декември',
        dateD: '20',
        image: imageEvent_2,
        title: 'Празника на Община Смолян и честване на 107 от освобождението на...'
    },
    {
        id: 3,
        dateM: '',
        dateD: '',
        image: imageEvent_3,
        title: 'РИМ “Стою Шишков” - Смолян се включва в празника Никлуден'
    }
]

let listMegatronCarousel = [
    {
        id: 1,
        title: 'Шлем',
        type: 'Бронз',
        description: 'Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.',
        width: 'макс. височина - 39 см.',
        height: 'макс. широчина - 23/18 см.',
        dating: 'VI - III век пр.Хр.',
        settlement: 'с. Беден',
        number: 'A837',
        bgImage: bgCarousel,
        image: imageItem_1
    },
    {
        id: 2,
        title: 'Шлем',
        type: 'Бронз',
        description: 'Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.',
        width: 'макс. височина - 39 см.',
        height: 'макс. широчина - 23/18 см.',
        dating: 'VI - III век пр.Хр.',
        settlement: 'с. Беден',
        number: 'A837',
        bgImage: bgCarousel,
        image: imageItem_2
    },
    {
        id: 3,
        title: 'Шлем',
        type: 'Бронз',
        description: 'Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.',
        width: 'макс. височина - 39 см.',
        height: 'макс. широчина - 23/18 см.',
        dating: 'VI - III век пр.Хр.',
        settlement: 'с. Беден',
        number: 'A837',
        bgImage: bgCarousel,
        image: imageItem_3
    },
    {
        id: 4,
        title: 'Шлем',
        type: 'Бронз',
        description: 'Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.',
        width: 'макс. височина - 39 см.',
        height: 'макс. широчина - 23/18 см.',
        dating: 'VI - III век пр.Хр.',
        settlement: 'с. Беден',
        number: 'A837',
        bgImage: bgCarousel,
        image: imageItem_3
    },
    {
        id: 5,
        title: 'Шлем',
        type: 'Бронз',
        description: 'Изработен от две части - епикранион и горна завита напред приставка. Двата набузника са окачени подвижно към епикраниона и отпред са закопчавани с ремък. Украсени са с пластична, ниско-релефна украса, представляваща стилизирана къдрава брада и мустаци.',
        width: 'макс. височина - 39 см.',
        height: 'макс. широчина - 23/18 см.',
        dating: 'VI - III век пр.Хр.',
        settlement: 'с. Беден',
        number: 'A837',
        bgImage: bgCarousel,
        image: imageItem_3
    }
]

class NewsPage extends Component {

    state = {
        bgHero: null,
        bgAboutUs: null,
        listOfNewsAndEvents: null,
        listMegatronCarousel: null
    }

    componentDidMount() {
        this.setState({bgHero: heroImage})
        this.setState({bgAboutUs: aboutUsImage})
        this.setState({listOfNewsAndEvents: listOfNewsAndEvents})
        this.setState({listMegatronCarousel: listMegatronCarousel})
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
                                <Row>
                                    <NewsAndEventsList listOfNewsAndEvents={this.state.listOfNewsAndEvents}/>
                                </Row>
                            </div>
                        </div>
                    </Container>
                </div>

                        <CarouselMegatron listMegatronCarousel={this.state.listMegatronCarousel}/>

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
                                    <br/>
                                    <Link
                                        style={{marginTop: '2rem'}}
                                        className="link cta_outline cta_outline__dark hvr-underline-from-left"
                                        to="#"
                                        itemProp="url"
                                        target=""
                                        rel="noopener nofollow noreferrer">
                                        вижте повече
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default NewsPage;
