const path = require('path') //node path helper

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const webpackNodeExternals = require('webpack-node-externals') //reduce libraries bundled by webpack not for bundle size but 
                                                                //for slightly fast webpack proccess + page load times


const config = {
    //tell webpack we are building bundle for nodejs and not browser
    target: 'node',

    //tell webpack root file of server of applicaiton, or entry point
    entry: './src/index.js',

    //tell webpack where to put the output file generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build') //dirname is current working directory our project is executed in. WEbpack will auto create 'build' dir
    },

    externals: [webpackNodeExternals()] //tell webpack do not bundle and libraries if it exists inside node_modules folder
                                        //so anything in node_modules is NOT included in server side bundle!
}

module.exports = merge(commonConfig, config);