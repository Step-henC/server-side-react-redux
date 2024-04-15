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
  });

  Promise.all(promises).then(() => res.send(Renderer(req, store)));
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
