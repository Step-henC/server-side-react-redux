//entry point for client side code base
//the second entry point is index.js for server-side codebase

import React from 'react'
import ReactDOM from 'react-dom'
// import Home from './components/Home'; Do not need home now that we have a route for it
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';


//we have already rendered the app once on the server (index.js) into a skeletal template with renderToString
//we want to render into the same div that the app was rendered on the server
//so add and id=root on server in index.js
//not replacing anything, but telling react load up event listeners for buttons etc
//re-rendering over once-rendered html like we are doing is known as "hydration"
//ReactDOM.render(<Home/>, document.querySelector('#root'));

//replace render for more appropriate method: hydrate
ReactDOM.hydrate( // browser router does not work on server because it expects a url and server has no url
    <BrowserRouter> 
    <Routes/>
    </BrowserRouter>, document.querySelector('#root'));