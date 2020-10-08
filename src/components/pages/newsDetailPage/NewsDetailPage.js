import React, {Component} from 'react';
import heroImage from "../../../assets/images/baseHero.png";
import aboutUsImage from "../../../assets/images/about_us_section_bg.png";
import HeroInner from "../../hero/HeroInner";
import Container from "react-bootstrap/cjs/Container";
import Row from "react-bootstrap/cjs/Row";
import Col from "react-bootstrap/cjs/Col";
import imageEvent_1 from "../../../assets/images/imageEvent.png";
import imageEvent_2 from "../../../assets/images/imageEvent2.png";
import imageEvent_3 from "../../../assets/images/imageEvent3.png";
import Nav from "react-bootstrap/cjs/Nav";
import NewsAndEventsListHorizontal from "../../newsAndEventsList/NewsAndEventsListHorizontal";
import fbLogo from "../../../assets/images/facebook1.svg";
import twitterLogo from "../../../assets/images/twitter.svg";
import instagramLogo from "../../../assets/images/instagram.svg";

let listOfNewsAndEvents = [
    {
        id: 1,
        dateM: 'Октомври',
        dateD: '18',
        image: imageEvent_1,
        title: 'На пататнки и песни в музея',
        description: 'На 18.12.2019 г. от 18.00 часа в Регионален исторически музей „Стою Шишков“ – Смолян ще посрещнем публиката с почерпка, концерт и хоровод. Освен традиционното...'
    },
    {
        id: 2,
        dateM: 'декември',
        dateD: '20',
        image: imageEvent_2,
        title: 'Празника на Община Смолян и честване на 107 от освобождението на...',
        description: 'По повод 21 октомври – Празник на Община Смолян и честване 107 години от Освобождението на Родопите, Регионален исторически музей „Стою Шишков“ – Смолян...'
    },
    {
        id: 3,
        dateM: '',
        dateD: '',
        image: imageEvent_3,
        title: 'РИМ “Стою Шишков” - Смолян се включва в празника Никлуден',
        description: 'Регионален исторически музей „Стою Шишков“ – Смолян стартира музейна програма „Обредни хлябове за храмовите празници“. .'
    }
]

class NewsDetailPage extends Component {

    state = {
        bgHero: null,
        bgAboutUs: null,
        listOfNewsAndEvents: null
    }

    componentDidMount() {
        this.setState({bgHero: heroImage})
        this.setState({bgAboutUs: aboutUsImage})
        this.setState({listOfNewsAndEvents: listOfNewsAndEvents})
    }

    render() {
        return (
            <div className='home-page__wrap'>
                <HeroInner
                    title={'Новини и Събития'}
                    subtitle={''}
                />

                <div className='tab_list-container tab_list-container_content-dark'>
                    <Container className='tab_list-container__layout'>
                        <Row>
                            <Col lg={9}>

                            </Col>
                            <Col lg={2}>
                                <div className='socials'>
                                    <div className='socials-item'>
                                        <a href="https://www.facebook.com/museum.smolyan" target="_blank" rel="noopener noreferrer">
                                            <img className="" src={fbLogo} alt="" itemProp="image"/>
                                        </a>
                                    </div>
                                    <div className='socials-item'>
                                        <a href="https://twitter.com/museum_sm" target="_blank" rel="noopener noreferrer">
                                            <img className="" src={twitterLogo} alt="" itemProp="image"/>
                                        </a>
                                    </div>
                                    <div className='socials-item'>
                                        <a href="https://www.instagram.com/museumsmolyan/" target="_blank" rel="noopener noreferrer">
                                            <img className="" src={instagramLogo} alt="" itemProp="image"/>
                                        </a>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}

export default NewsDetailPage;
