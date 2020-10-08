import React from 'react';
import '../assets/styles/main.scss';
import history from "../history";
import { Router, Route, Switch} from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HomePage from "./pages/homePage/HomePage";
import NewsPage from "./pages/newsPage/NewsPage";
import NewsDetailPage from "./pages/newsDetailPage/NewsDetailPage";

function App() {
    return (
        <Router history={history}>
            <div className="wrapper">
                <Header/>
                <main>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/news' exact component={NewsPage}/>
                        <Route path='/news/:newsName' exact component={NewsDetailPage}/>
                    </Switch>
                </main>
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
