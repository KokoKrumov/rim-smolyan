import React, {Component} from 'react';
import '../assets/styles/main.scss';
import history from "../history";
import {Router, Route, Switch} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import NewsPage from "./pages/newsPage/NewsPage";
import AboutUs from "./pages/aboutUs/AboutUs";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";
import Contacts from "./pages/contacts/Contacts";
import ModalComponent from "./modal/ModalComponent";
import {isMobileScreen} from "../utilities/browser";

class App extends Component {

    componentDidMount() {
        if (isMobileScreen()) {
            console.log('Mobile screen');
            this.showModal()
        }
    }

    render() {
        return (
            <Router history={history}>
                <div className="wrapper">
                    <Header />
                    <main>
                        <Switch>
                            <Route path='/' exact component={HomePage}/>
                            <Route path='/news' exact component={NewsPage}/>
                            <Route path='/news/:articleId' exact component={NewsDetailPage}/>
                            <Route path='/about-us' exact component={AboutUs}/>
                            <Route path='/contacts' exact component={Contacts}/>
                        </Switch>
                    </main>
                    <Footer />
                    <ModalComponent />
                </div>
            </Router>
        );
    }

}

export default App;
