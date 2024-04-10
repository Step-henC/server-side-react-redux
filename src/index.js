// const express = require('express'); //Commonjs module syntax
// const React = require('react'); //these are ES2016 modules so syntax looks weird
// const renderToString = require('react-dom/server').renderToString; //turns react components to HTML
// const Home = require('./client/components/Home').default;

//Because Webpack is handling our server code (bundling with babel) 
//We can convert ALL our code syntax into ES2015 JS 
//The reason is for cohesive coding patterns accross the project for developers!
import 'babel-polyfill'; //defines helper functions like async await syntax
import express from 'express';
import Renderer from './helpers/Renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public')) //tell express app to make our public dir like a static open to the outside world

const store = createStore();
app.get('*', (req, res) => { //we pass in all routes to allow react to handle routing. StaticRouter for server, browserRouter in client for URL

res.send(Renderer(req, store))
})


app.listen(3000, () => {
    console.log('listening on 3000')
})

