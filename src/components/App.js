import React from 'react';
import '../assets/styles/main.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import history from "../history";
import {BrowserRouter, Router, Route} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

function App() {
    return (
        <Router history={history}>
            <div className="wrapper">
                <Header/>
                <main>

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
