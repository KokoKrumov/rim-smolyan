import React from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider} from "react-intl";
import App from './components/App';
import messages_bg from "./translations/bg.json";
import messages_en from "./translations/en.json";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk'
import GA4React from "ga-4-react";

const ga4react = new GA4React("G-Y09PXD41TG");

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

const messages = {
    'bg': messages_bg,
    'en': messages_en,
};
const language = localStorage.getItem('lang') ??
    'bg' ??
    navigator.languages[0].split(/[-_]/)[0];  // language without region code

(async _ => {
    await ga4react.initialize()
        .then((ga4) => {
            ga4.pageview('path')
            ga4.gtag('event', 'pageview', 'path')
        }, (err) => {
            console.error(err)
        });

    ReactDOM.render(
        <IntlProvider locale={language} messages={messages[language]}>
            <Provider store={store}>
                <App/>
            </Provider>
        </IntlProvider>,

        document.getElementById('root')
    );
})();
