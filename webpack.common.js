module.exports = {

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