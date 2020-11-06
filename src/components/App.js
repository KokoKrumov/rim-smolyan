import React, {Component} from 'react';
import '../assets/styles/main.scss';
import history from "../history";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import NewsPage from "./pages/newsPage/NewsPage";
import AboutUs from "./pages/aboutUs/AboutUs";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";
import Contacts from "./pages/contacts/Contacts";
import ModalComponent from "./modal/ModalComponent";
import NotFound from "./pages/NotFound";
import {isMobileScreen} from "../utilities/browser";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import {showModal} from "../actions";

class App extends Component {

    componentDidMount() {
        if (isMobileScreen()) {
            console.log('Mobile screen');
            this.props.showModal('modal-redirect')
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
                            <Route path='/contact-us' exact component={Contacts}/>
                            <Route path='*' exact component={NotFound}/>
                        </Switch>
                    </main>
                    <Footer />
                    <ModalComponent />
                </div>
            </Router>
        );
    }

}

export default injectIntl(connect(
    null,
    {
        showModal
    }
)(App));
