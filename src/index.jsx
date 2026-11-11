import React from 'react';
import { createRoot } from 'react-dom/client';
import {IntlProvider} from "react-intl";
import App from './components/App';
import messages_bg from "./translations/bg.json";
import messages_en from "./translations/en.json";
import {Provider} from "react-redux";
import { store } from './store/store';
import ReactGA from "react-ga4";
import { preload } from 'react-dom';
import heroImage from './assets/images/baseHero.jpg';

const messages = {
    'bg': messages_bg,
    'en': messages_en,
};
const language = localStorage.getItem('lang') ??
    'bg' ??
    navigator.languages[0].split(/[-_]/)[0];  // language without region code

const root = createRoot(document.getElementById('root'));

if (window.location.pathname === '/') {
    preload(heroImage, { as: 'image', fetchPriority: 'high' });
}

root.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <Provider store={store}>
            <App/>
        </Provider>
    </IntlProvider>
);

// The Google tag sends the initial page view when it is configured and one for each
// history change (Enhanced Measurement), so no page views are sent manually.
try {
    ReactGA.initialize("G-Y09PXD41TG");
} catch (err) {
    console.error(err)
}
