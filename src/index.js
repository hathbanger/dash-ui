import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

import { Provider } from 'react-redux'

import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'

import { routerMiddleware } from 'connected-react-router'

import indexRoutes from './routes/index.jsx';

import registerServiceWorker from './registerServiceWorker';

import './assets/css/bootstrap.min.css';
import './assets/sass/light-bootstrap-dashboard.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';

import rootReducer from './reducers/rootReducer'

import thunkMiddleware from 'redux-thunk'
const history = createBrowserHistory();

// const store = createStore(
//   connectRouter(history)(rootReducer), // new root reducer with router state
//   compose(
//     applyMiddleware(
//       routerMiddleware(history),
//     ),
//   ),
// )

    // const history = createHistory();
    const store = createStore(rootReducer, undefined, compose(
        applyMiddleware(thunkMiddleware, routerMiddleware(history))));

// let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
// let store = createStoreWithMiddleware(rootReducer)

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {
                    indexRoutes.map((prop,key) => {
                        return (
                            <Route path={prop.path} component={prop.component}  key={key}/>
                        );
                    })
                }
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
