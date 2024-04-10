// const express = require('express'); //Commonjs module syntax
// const React = require('react'); //these are ES2016 modules so syntax looks weird
// const renderToString = require('react-dom/server').renderToString; //turns react components to HTML
// const Home = require('./client/components/Home').default;

//Because Webpack is handling our server code (bundling with babel) 
//We can convert ALL our code syntax into ES2015 JS 
//The reason is for cohesive coding patterns accross the project for developers!

import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Home from './client/components/Home';

const app = express();

app.use(express.static('public')) //tell express app to make our public dir like a static open to the outside world

app.get('/', (req, res) => {
const content = renderToString(<Home/>); //node cannot read jsx so we told webpack to bundle code
//using babel to transpile jsx to ES5 javascript. After building bundle with "npm dev:build:server"
//we told node to execute bundle with command "node build/bundle.js"

//tell browser to download bundle.js
const html = ` 
    <html>
     <head></head>
        <body>
            <div id="root">${content}</div>
            <script src="bundle.js"></script>
        </body>
    </html>
`;

//res.send(content);
res.send(html)
})


app.listen(3000, () => {
    console.log('listening on 3000')
})

