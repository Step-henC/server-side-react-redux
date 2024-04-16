// const express = require('express'); //Commonjs module syntax
// const React = require('react'); //these are ES2016 modules so syntax looks weird
// const renderToString = require('react-dom/server').renderToString; //turns react components to HTML
// const Home = require('./client/components/Home').default;

//Because Webpack is handling our server code (bundling with babel)
//We can convert ALL our code syntax into ES2015 JS
//The reason is for cohesive coding patterns accross the project for developers!
import "babel-polyfill"; //defines helper functions like async await syntax
import express from "express";
import Renderer from "./helpers/Renderer";
import createStore from "./helpers/createStore";
import { matchRoutes } from "react-router-config";
import Routes from "./client/Routes";
import proxy from "express-http-proxy";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    //this argument is just for this course// its an oauth flow
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    },
  })
); //set proxy before any other middlewares or routes
//saying any request that hit '/api' will be routerd to the proxy website server

app.use(express.static("public")); //tell express app to make our public dir like a static open to the outside world

app.get("*", (req, res) => {
  //we pass in all routes to allow react to handle routing. StaticRouter for server, browserRouter in client for URL

  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    //deconstruct matchRoutes object to get "route" and get loadData function
    return route.loadData ? route.loadData(store) : null; //not all objects in react-router-config array will have loadData function

  }).map(promise => { //could add in route.loadData(store) but new map is cleaner looking
    if (promise){ //and not null like above
      return new Promise((resolve, reject) => {
        promise.then(resolve).catch(resolve); //if good or bad we will resolve all promises for Promise.all below
      }) //instead of catch statement in Promise.all that will not complete all promises, since catch is thrown at first failuer
      //so we wrap promises in a new promise and resolve all, even though final render will not see failed promises
    }
  });

  Promise.all(promises).then(() => {
    const context = {} //need this for 404 response code
    const content = Renderer(req, store, context)

    if (context.url == '/'){ //in the requireAuth helper our redirect passes a url property with the home '/'
      return res.redirect(301, context.url) //status code 301 means temporary redirect
    }
    if (context.notFound){
      res.status(404);
    }
    res.send(content)
  
  });
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
