# What Is this

Server Side Rendering using NodeJS and React with Redux. The punchline is that we use webpack to bundle JS code for client and server and get the browser to fetch the "bundle" JS code. We have an HTML template that we
use ReactDOM.rehydrate() to inject JS code on the server side. We have two different redux stores for the server and client, and we pass server store into client "renderer" function. 
Routing is handled by React, but we synchronize server and client routing with context of react-router-dom StaticRouter. 

We use renderToString for html template instead of renderToNodeStream, because although the latter is faster in TTFB (time to first byte; page loading metric by Google) we are not able to send changed status codes in case
of failure. 

Also, we incorporated SEO optimization using react-helmet library by the NFL which allows to create dynamic [Open Graph Protocol or OG ](https://ogp.me/) title and meta tags that can change on a page to page basis.
The OG protocol is recommended by facebook and google for fetching images, titles, urls and more whenever a webpage is referenced. 


# How to Run 

Git clone project -> run `npm run dev` command to build both client and server code and start express server at `localhost:3000`


Courtesy of Stephen Grider Udemy Course. 
