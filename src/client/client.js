//entry point for client side code base
//the second entry point is index.js for server-side codebase

import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home';

//we have already rendered the app once on the server (index.js) into a skeletal template with renderToString
//we want to render into the same div that the app was rendered on the server
//so add and id=root on server in index.js
//not replacing anything, but telling react load up event listeners for buttons etc
//re-rendering over once-rendered html like we are doing is known as "hydration"
//ReactDOM.render(<Home/>, document.querySelector('#root'));

//replace render for more appropriate method: hydrate
ReactDOM.hydrate(<Home/>, document.querySelector('#root'));