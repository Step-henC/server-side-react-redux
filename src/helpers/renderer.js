import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import serializeJavascript from 'serialize-javascript';//prevents XSS by converting code chars (<>, etc) into unicode equivalent
import { Helmet } from 'react-helmet';

export default(req, store, context) => {
    //renderToString differs from render in that it takes all React components one time, converts to html and stringifies it
    //where as render creates instances of components on DOM node
    //need static router for server side because browserRouter uses url context is required
    //StaticRouter needs the url from req object in express
    //staticRouter passes context to all rendered components
const content = renderToString(
<Provider store={store}>
    <StaticRouter location={req.path} context={context}> 
    <div>{renderRoutes(Routes)}</div>
</StaticRouter>
</Provider>); //node cannot read jsx so we told webpack to bundle code
//using babel to transpile jsx to ES5 javascript. After building bundle with "npm dev:build:server"
//we told node to execute bundle with command "node build/bundle.js"
//changed dev:build:server to just dev:build-server because npm-run-all package gets confused with extra semicolon



const helmet = Helmet.renderStatic(); //object of all tags we loaded in library. use to stick in header

//BUNDLE.JS Notes
//the bundle.js script tag tells the browser to go back to the server
//and download our js bundle for the front-end (Client) code
//because we did express.static('public' ) express server tells browser where to look, and browser looks in dir for bundle.js
//IMPORTANTLY, the point of SSR (server-side-rendering) we are getting html immediately, somehting shown on screen immediately
//getting js code (for button clicks, etc) later to reduce SSR page load times
return ` 
    <html>
     <head>
     ${helmet.title.toString()}
     ${helmet.meta.toString()}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
     </head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
            <script> 
                window.INITIAL_STATE = ${serializeJavascript(store.getState())}
            </script>
        </body>
    </html>
`;

}