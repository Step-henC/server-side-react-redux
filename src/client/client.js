//entry point for client side code base
//the second entry point is index.js for server-side codebase
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom'
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux'; 
import thunk from 'redux-thunk'; //handle async action creators
import {Provider} from 'react-redux'; //ties store and react together. 
import reducers from './reducers';
import { renderRoutes } from 'react-router-config';
const store = createStore(reducers, {}, applyMiddleware(thunk));


//we have already rendered the app once on the server (index.js) into a skeletal template with renderToString
//we want to render into the same div that the app was rendered on the server
//so add and id=root on server in index.js
//not replacing anything, but telling react load up event listeners for buttons etc
//re-rendering over once-rendered html like we are doing is known as "hydration"
//ReactDOM.render(<Home/>, document.querySelector('#root'));

//replace render for more appropriate method: hydrate
ReactDOM.hydrate( // browser router does not work on server because it expects a url and server has no url
<Provider store={store}>
    <BrowserRouter> 
    <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
    </Provider>
, document.querySelector('#root'));