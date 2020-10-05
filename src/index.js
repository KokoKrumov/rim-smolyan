import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { IntlProvider } from "react-intl";
import messages_bg from "./translations/bg.json";
import messages_en from "./translations/en.json";
// import {Provider} from "react-redux";
// import {createStore, applyMiddleware, compose} from 'redux';
// import reducers from './reducers';
// import reduxThunk from 'redux-thunk'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

const messages = {
    'bg': messages_bg,
    'en': messages_en,
};
const language = localStorage.getItem('lang') ??
	'bg' ??
	navigator.languages[0].split(/[-_]/)[0];  // language without region code

ReactDOM.render(
    // <Provider store={store}>
    //
    // </Provider>,
    <IntlProvider locale={language} messages={messages[language]}>
    	<App />
   	</IntlProvider>,
    document.getElementById('root')
);

