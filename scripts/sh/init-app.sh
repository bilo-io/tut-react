#!/bin/bash
echo '# WebApp Readme' >> README2.md
echo '================================'
echo ' (init-react)    =>    node initialisation'
echo '--------------------------------'
# npm init
echo '================================'
echo ' (init-react)    =>    express'
echo '--------------------------------'
# npm install express --save
echo "var express = require('express')
var fallback = require('express-history-api-fallback');
var server = express();
var port = process.env.port || 2001;

// https://stackoverflow.com/questions/28553904/client-routing-using-react-router-and-server-side-routing
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/dist/'));
});

server.use(fallback('index.html', {root:__dirname + '/dist/'}));
server.use(express.static(__dirname + '/dist/'));
server.listen(port, '0.0.0.0');
" > server.js
echo '================================'
echo ' (init-react)    =>    webpack'
echo '--------------------------------'
# npm install webpack webpack-dev-server --save-dev
echo "var webpack = require('webpack');
var path = require('path');

var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    devtool: 'source-map',
    entry: SRC + '/index.js',
    output: {
        path: DIST,
        // publicPath: 'http://localhost:2001/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.scss$/,
                loaders: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }, {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    }
                ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'})],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },
}
" > webpack.config.js
echo '================================'
echo ' (init-react)    =>    DONE!!'
echo '--------------------------------'
echo '================================'
echo ' (init-react)    =>    src'
echo '--------------------------------'
mkdir src
mkdir ./src/app
mkdir ./src/img
mkdir ./src/styles
echo "
new-project
│   .babelrc                // Config file for transpiling ES6 & React to older browsers (es5)
│   package.json            // Node Package/Project dependencies
│   server.js               // serves the application (from 'dist' folder) in a production environment
│   webpack.config.js           
│   
├───dist (generated)            // generated folder containing production package
├───node_modules (generated)    // generated folder for node modules/dependencies
├───scripts                     // scripts that perform certain, repetitive tasks
│   ├───sh                      // -> supports bash scripts (.sh)
│   └───ps                      // -> supports powershell scripts (.sh)
│           
└───src
    │   favicon.ico
    │   index.html
    │   index.js
    │   
    ├───app                 // app logic              
    ├───img                 // images for the app (result in ./dist/assets/ in prod build)
    └───sass                // general .sass files for the application"
