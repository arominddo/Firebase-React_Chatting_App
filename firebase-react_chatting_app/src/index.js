import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";

import Reducer from "./redux/reducer";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from 'react-router-dom';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
            <Router>
                <App />
            </Router>
        </Provider>

    </React.StrictMode>
);

reportWebVitals();
