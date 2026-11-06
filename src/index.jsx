import React from 'react';
import { createRoot } from 'react-dom/client';
import {IntlProvider} from "react-intl";
import App from './components/App';
import messages_bg from "./translations/bg.json";
import messages_en from "./translations/en.json";
import {Provider} from "react-redux";
import { store } from './store/store';
import GA4React from "ga-4-react";

const ga4react = new GA4React("G-Y09PXD41TG");

const messages = {
    'bg': messages_bg,
    'en': messages_en,
};
const language = localStorage.getItem('lang') ??
    'bg' ??
    navigator.languages[0].split(/[-_]/)[0];  // language without region code

const root = createRoot(document.getElementById('root'));

root.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <Provider store={store}>
            <App/>
        </Provider>
    </IntlProvider>
);

ga4react.initialize()
    .then((ga4) => {
        ga4.pageview('path')
        ga4.gtag('event', 'pageview', 'path')
    })
    .catch((err) => {
        console.error(err)
    });
