import React from 'react';
import '../assets/styles/main.scss';
import Hero from "../components/hero/Hero";
import history from "../history";
import {BrowserRouter, Router, Route} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import heroImage from '../../src/assets/images/baseHero.png';

function App() {
    return (
        <Router history={history}>
            <div className="wrapper">
                <Header/>
                <main>
                    <Hero
                        Image={heroImage}
                        isMainHero={true}
                        title={'Средните Родопи'}
                        subtitle={'от праисторическите времена до съвременността'}
                        subtitleSm={'Рaзгледайте нашите фондове'}
                    />
                </main>
                <Footer/>
                {/*<Route path='/' exact component={StreamList}/>*/}
                {/*<Route path='/streams/new' exact component={StreamCreate}/>*/}
                {/*<Route path='/streams/edit/:id' exact component={StreamEdit}/>*/}
                {/*<Route path='/streams/delete' exact component={StreamDelete}/>*/}
                {/*<Route path='/streams/show' exact component={StreamShow}/>*/}
            </div>
        </Router>
    );
}

export default App;
