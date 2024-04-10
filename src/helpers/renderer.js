import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';

export default(req) => {
    //renderToString differs from render in that it takes all React components one time, converts to html and stringifies it
    //where as render creates instances of components on DOM node
    //need static router for server side because browserRouter uses url context is required
    //StaticRouter needs the url from req object in express
const content = renderToString(<StaticRouter location={req.path} context={{}}>
    <Routes/> 
</StaticRouter>); //node cannot read jsx so we told webpack to bundle code
//using babel to transpile jsx to ES5 javascript. After building bundle with "npm dev:build:server"
//we told node to execute bundle with command "node build/bundle.js"

return ` 
    <html>
     <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>
`;

}