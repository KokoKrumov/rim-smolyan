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

    state = {
        modalIsOpen: false
    }

    componentDidMount() {
        if (isMobileScreen()) {
            console.log('Mobile screen');
            this.showModal()
        }
    }


    showModal = (e) => {
        if(e){
            e.preventDefault();
        }
        this.setState({ modalIsOpen: true });
    };
    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };


    homePage = () => {
        return (
            <HomePage showModal={this.showModal}/>
        )
    }
    contactsPage = () => {
        return (
            <Contacts showModal={this.showModal}/>
        )
    }

    render() {
        return (
            <Router history={history}>
                <div className="wrapper">
                    <Header showModal={this.showModal}/>
                    <main>
                        <Switch>
                            <Route path='/' exact component={this.homePage}/>
                            <Route path='/news' exact component={NewsPage}/>
                            <Route path='/news/:articleId' exact component={NewsDetailPage}/>
                            <Route path='/about-us' exact component={AboutUs}/>
                            <Route path='/contacts' exact component={this.contactsPage}/>
                        </Switch>
                    </main>
                    <Footer showModal={this.showModal}/>
                    <ModalComponent isOpen={this.state.modalIsOpen} closeModal={this.closeModal}/>
                    {/*<Route path='/streams/new' exact component={StreamCreate}/>*/}
                    {/*<Route path='/streams/edit/:id' exact component={StreamEdit}/>*/}
                    {/*<Route path='/streams/delete' exact component={StreamDelete}/>*/}
                    {/*<Route path='/streams/show' exact component={StreamShow}/>*/}
                </div>
            </Router>
        );
    }

}

export default App;
