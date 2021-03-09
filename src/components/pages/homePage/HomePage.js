import React, {Component, useEffect} from 'react';
import heroImage from "../../../assets/images/baseHero.jpg";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import Hero from "../../hero/Hero";
import WorkInfoLine from "../../infoLine/WorkInfoLine"
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/cjs/Row";
import imageItem_1 from "../../../assets/images/img-shlem.jpg";
import imageItem_2 from "../../../assets/images/img-diskos.jpg";
import imageItem_3 from "../../../assets/images/img-nakit.jpg";
import bgCarousell from "../../../assets/images/bg-shlem.jpg";
import bgCarousel2 from "../../../assets/images/bg-diskos.jpg";
import bgCarousel3 from "../../../assets/images/bg-nakit.jpg";
import CarouselMegatron from "../../carousel/carouselMegatron";
import {connect} from 'react-redux'
import {fetchNews, showModal} from "../../../actions";
import InfoColumn from "../../infoColumn/InfoColumn";
import {FormattedMessage} from 'react-intl';
import {isTabletScreen} from "../../../utilities/browser";
import CarouselMegatronMobile from "../../carousel/CarouselMegatronMobile";

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
        bgImage: bgCarousell,
        image: imageItem_1
    },
    {
        id: 2,
        title: 'Дискос',
        type: 'Мед, сребърно покритие',
        description: 'Богослужебен съд с узчукана релефна украса. Ръчна изработка. Изобразени са дванадесетте апостола, а в центъра - Исус Христос Вседържаител. Чипровска златарска школа.',
        width: 'диаметър - 16 см.',
        height: '',
        dating: 'края на XVII - началото на XVIII век',
        settlement: '',
        number: 'B417',
        bgImage: bgCarousel2,
        image: imageItem_2
    },
    {
        id: 3,
        title: 'Накит мъжки',
        type: 'Сребърна сплав (занаятчийско производство)',
        description: 'Верижка за джобен часовник. Пет пластини с неправлина форма, свързани чрез верижки. Едната група пластини са украсени с релефно изработен във филигранна и гранулирана техника растителен и геометричен мотив, края на верижките има висулки. Върху другата група е положена украса от двете страни.',
        width: 'дължина на верижката - 77 см.',
        height: 'тегло - 406,64 гр.',
        dating: 'XIX век',
        settlement: 'Смолянско',
        number: 'E5890',
        bgImage: bgCarousel3,
        image: imageItem_3
    }
]

class HomePage extends Component {

    state = {
        bgHero: null,
        bgAboutUs: null,
        listOfNewsAndEvents: null,
        listMegatronCarousel: null,
        isTabletScreenV: isTabletScreen(),
        infoColumn: {
            title: "about-us",
            text: "home-page.about-us.text",
            showMoreLink: '/about-us',
            bgAboutUs: aboutUsImage,
            columns: 2
        }
    }


    handleResize() {
        this.setState({
            isTabletScreenV: isTabletScreen()
        })
    }

    fetchData = () => {
        if (this.props
            && this.props.news
            && this.props.news !== this.state.news) {
            console.log(process.env.REACT_APP_API_URL);
            this.props.fetchNews()
                .then(() => {
                    this.setState({listOfNewsAndEvents: this.props.news})
                })

        }
    }

    componentDidMount() {
        this.fetchData();
        window.addEventListener('resize', () => {
            this.handleResize()
        })

    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => {
            this.handleResize()
        })
    }

    handleShowModal(data, url, e) {
        e.preventDefault();
        this.props.showModal(data, url)
    }

    render() {
        return (
            <div className='home-page__wrap'>
                <Hero
                    Image={heroImage}
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
                                {
                                    !this.state.isTabletScreenV
                                        ?
                                        <div className='nae__title-line__link'>
                                            <Link
                                                className="link cta_outline cta_outline__dark hvr-underline-from-right"
                                                to="/news"
                                                itemProp="url"
                                                target=""
                                                rel="noopener nofollow noreferrer">
                                                <FormattedMessage id="see-all"/>
                                            </Link>

                                        </div>
                                        :
                                        null
                                }
                            </div>
                            <Row>
                                <NewsAndEventsList listOfNewsAndEvents={this.state.listOfNewsAndEvents}/>
                            </Row>
                            {
                                this.state.isTabletScreenV
                                    ?
                                    <div className='nae__title-line__link'>
                                        <Link
                                            className="link cta_outline cta_outline__dark hvr-underline-from-right"
                                            to="/news"
                                            itemProp="url"
                                            target=""
                                            rel="noopener nofollow noreferrer">
                                            <FormattedMessage id="see-all"/>
                                        </Link>

                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </Container>
                </div>

                <CarouselMegatron
                    listMegatronCarousel={listMegatronCarousel}
                    isTableScreen={this.state.isTabletScreenV}
                />
                <div className='home-page__info-column'>
                    <InfoColumn
                        title={this.state.infoColumn.title}
                        text={this.state.infoColumn.text}
                        backgroundIMage={this.state.infoColumn.bgAboutUs}
                        showMoreLink={this.state.infoColumn.showMoreLink}
                        columns={this.state.infoColumn.columns}
                    />

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        news: Object.values(state.news)
    };
}

export default connect(
    mapStateToProps,
    {
        fetchNews,
        showModal
    }
)(HomePage);
