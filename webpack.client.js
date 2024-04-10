//this will ship our client code like event handlers for buttons to work
//as of now, we are only shipping html to render to screen

const path = require('path') //node path helper
module.exports = {
//node is no longer our 'target' for runtime cuz we intend to use this code in the browser   

    //tell webpack root file of server of applicaiton, or entry point
    entry: './src/client/client.js',

    //tell webpack where to put the output file generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public') //dirname is current working directory our project is executed in. WEbpack will auto create 'public' dir
    },

    //tell webpack run babel on every file it runs through

    module: {
        rules: [
            {
                test: /\.js?$/, //regex to test against every file name and match only js files
                loader: 'babel-loader', //when found file, load babel which this loader is webpack native
                exclude: /node_modules/, //regex that says do not run babel over node_modules dir
                options: {
                    presets: [ //rules run by babel to transpile code
                        'react', 
                        'stage-0', //used for async code
                        ['env', {targets: {browsers: ['last 2 versions']}}] //tell babel run rules over last 2 versions of all popular latest browsers
                    ]
                }
            }
        ]
    }


}