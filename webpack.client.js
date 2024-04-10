//this will ship our client code like event handlers for buttons to work
//as of now, we are only shipping html to render to screen

const path = require('path') //node path helper

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const config = {
//node is no longer our 'target' for runtime cuz we intend to use this code in the browser   

    //tell webpack root file of server of applicaiton, or entry point
    entry: './src/client/client.js',

    //tell webpack where to put the output file generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public') //dirname is current working directory our project is executed in. WEbpack will auto create 'public' dir
    }
}

module.exports = merge(commonConfig, config);