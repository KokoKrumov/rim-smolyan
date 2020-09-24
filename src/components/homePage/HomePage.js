import React, {Component} from 'react';
import heroImage from "../../assets/images/baseHero.png";
import Hero from "../hero/Hero";
import WorkInfoLine from "../workInfoLine/WorkInfoLine"

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
                <WorkInfoLine />
            </div>
        )
    }
}

export default HomePage;
