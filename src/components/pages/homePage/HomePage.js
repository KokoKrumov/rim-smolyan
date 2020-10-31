import React, {Component} from 'react';
import heroImage from "../../../assets/images/baseHero.png";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import Hero from "../../hero/Hero";
import WorkInfoLine from "../../infoLine/WorkInfoLine"
import NewsAndEventsList from "../../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";
import {Link} from "react-router-dom";
import Row from "react-bootstrap/cjs/Row";
import imageItem_1 from "../../../assets/images/img-shlem.png";
import imageItem_2 from "../../../assets/images/img-diskos.png";
import imageItem_3 from "../../../assets/images/img-nakit.png";
import bgCarousell from "../../../assets/images/bg-shlem.png";
import bgCarousel2 from "../../../assets/images/bg-diskos.png";
import bgCarousel3 from "../../../assets/images/bg-nakit.png";
import CarouselMegatron from "../../carousel/carouselMegatron";
import {connect} from 'react-redux'
import {fetchNews, showModal} from "../../../actions";
import InfoColumn from "../../infoColumn/InfoColumn";

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
        infoColumn: {
            title: "about-us",
            text: "home-page.about-us.text",
            showMoreLink: true,
            bgAboutUs: aboutUsImage,
            columns: 2
        }
    }

    fetchData = () => {
        if (this.props
            && this.props.news
            && this.props.news !== this.state.news) {
            this.props.fetchNews()
                .then(() => {
                    this.setState({listOfNewsAndEvents: this.props.news})
                })

        }
    }

    componentDidMount() {
        this.fetchData();
        this.setState({
            bgHero: heroImage,
            listMegatronCarousel: listMegatronCarousel
        })
    }

    handleShowModal(e, data) {
        e.preventDefault();
        this.props.showModal(data)
    }

    render() {
        return (
            <div className='home-page__wrap'>
                <Hero
                    Image={this.state.bgHero}
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
                                        to="/news"
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

                <CarouselMegatron
                    listMegatronCarousel={this.state.listMegatronCarousel}
                />

                <InfoColumn
                    title={this.state.infoColumn.title}
                    text={this.state.infoColumn.text}
                    backgroundIMage={this.state.infoColumn.bgAboutUs}
                    showMoreLink={this.state.infoColumn.showMoreLink}
                    columns={this.state.infoColumn.columns}
                />

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
