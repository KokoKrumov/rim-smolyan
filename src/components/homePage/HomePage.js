import React, {Component} from 'react';
import heroImage from "../../assets/images/baseHero.png";
import Hero from "../hero/Hero";
import WorkInfoLine from "../workInfoLine/WorkInfoLine"
import NewsAndEventsList from "../newsAndEventsList/NewsAndEventsList";
import Container from "react-bootstrap/cjs/Container";

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
                            <h1 className='h1'>
                                Новини и Събития
                            </h1>
                            <div>
                                <NewsAndEventsList/>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default HomePage;
