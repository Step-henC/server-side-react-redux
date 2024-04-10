import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/components/Home';


export default() => {
const content = renderToString(<Home/>); //node cannot read jsx so we told webpack to bundle code
//using babel to transpile jsx to ES5 javascript. After building bundle with "npm dev:build:server"
//we told node to execute bundle with command "node build/bundle.js"

//tell browser to download bundle.js
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