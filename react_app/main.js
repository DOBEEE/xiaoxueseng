import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './components/routes.jsx';
import configureStore from './store';

injectTapEventPlugin();
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router routes={routes} history={browserHistory}/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('container')
);