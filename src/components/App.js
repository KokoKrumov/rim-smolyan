import React from 'react';
import '../assets/styles/main.scss';
import Hero from "../components/hero/Hero";
import history from "../history";
import {BrowserRouter, Router, Route, Switch} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePage from "./homePage/HomePage";

function App() {
    return (
        <Router history={history}>
            <div className="wrapper">
                <Header/>
                <Switch>
                    <main>
                        <Route path='/' exact component={HomePage}/>
                    </main>
                </Switch>
                <Footer/>
                {/*<Route path='/streams/new' exact component={StreamCreate}/>*/}
                {/*<Route path='/streams/edit/:id' exact component={StreamEdit}/>*/}
                {/*<Route path='/streams/delete' exact component={StreamDelete}/>*/}
                {/*<Route path='/streams/show' exact component={StreamShow}/>*/}
            </div>
        </Router>
    );
}

export default App;
