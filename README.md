# Tutorial: React

>Pre-requisites:
> - NodeJS, ExpressJS, Webpack
> - the tutorial ["https://github.com/bilo-io/tut-fed"](https://github.com/bilo-io/tut-fed) covers the above topics
> - you can also clone the repo above, and follow along this tutorial

|||
|:--|:--|
|![](https://raw.githubusercontent.com/bilo-io/tutorials/master/Logos/React/logo-react.png)|Have you ever wanted to start building frontend web applications, but always hit a road block at one point or another? Have you experienced the pain of constantly reloading an `index.html` page to see your changes? Is it possible that you don't even know how to get started? Perhaps you already have a basic project, but you don't know how to bundle it for production?|

If you have experienced any of the pain points above, then keep reading. This article is a guide to conquering all the caveats mentioned above. I will begin with a basic project structure, using NodeJS and Webpack.

# Quickstart

If you want the source code, find it on [`https://github.com/bilo-io/tut-react`](https://github.com/bilo-io/tut-react). You can clone, setup and run it with the following console commands:

- `git clone https://github.com/bilo-io/tut-react.git`
- `cd ./tut-react`
- `npm install`
- `npm start`
- [http://localhost:8080](http://localhost:8080)

> **NOTE**: 
> - While `npm start` uses the Webpack DevServer, using the `src` folder ... use this while developing.
> - The express server can be used with `node server.js` which serves the `dist` (distribution/production folder).
> - The `dist` folder is generated with the  `npm run build` command.

# Overview

There are certain goals set out, which will be accomplished by the end of this article. The purpose of this article is for a frontend developer:

## Goals
- to learn how create a React app from scratch
- to learn and how to integrate React in an existing webapplication
- to cover the react router
- to use react's props and state
- to connect to a restful web service (Google Places API)
- to use a third party javascript library (LeafletJS)

## Structure

As such this tutorial is structured in the following logical flow:

1. **Project Structure** - The a basic, manageable folder structure we will create throughout the tutorial.
packaging.


# 1. Project Structure

We will have a very simple, yet manageable project structure. If you are following along with the tutorial, create your root project folder (e.g. `tut-fed`, from here on referred to as `root`) as follows:
```sh
tut-fed/                    # project root
│
├───dist/                   # prod app bundle
├───node_modules/           # node dependencies
├───src/                    # webapp source code
│   │
│   ├───app/                # React app
│   │   ├───components/     # Shared components
│   │   ├───pages/          # Main app pages
│   │   └───app.js          # root component
│   │
│   ├───img/                # images
│   ├───styles/             # app styles
│   │
│   ├───index.js            # entry point of React (add app.js to DOM here)
│   ├───index.html          # entry point to app
│   └───style.css           # styles for app appearance
│
├───.babelrc                # transpiler configuration
├───package.json            # node package file
├───server.js               # serves webapp in prod
└───webpack.config.js       # webpack config for bundling
```
 The table below explains each of these files, and in the rest of the article we construct this structure in a comprehensive set of steps.

|File | Purpose |
|:-----|:--------|
| `package.json`| a Node package file, listing the webapp's dependencies, command line scripts, etc.|
|`server.js`| serves the webapplication in the `dist` folder|
|`webpack.config.js`| Webpack configuration file for bundling the application|
| `src/`      | source folder of the webapp, containing at the very least an `index.html` |
| `dist/`| (generated) distribution folder, which contains the production package |
|`artifact/`| (generated) application package with server, to test prod deployment locally|
|`node_modules/`| (generated) Node dependencies, 3rd party packages the webapp requires to function|

# Adding React to your Webapp

Fortunately, react is just a javascript library. As such, it is quite easy to add to any project that uses Node and Webpack. Basically, we need to do only 2 things: 1) install react in your webapp and 2) configure Webpack to load the files accordingly.

To install react, you just need 2 dependencies:

- `npm install react --save-dev`
- `npm install react-dom --save-dev`

Now what's left is to configure Webpack, to load `.js` and `.jsx` files accordingly.

>**NOTE:**
> - React uses `.jsx` syntax, which you can think of as a combination of Javascript and html
> - when bundling the webapp the `.jsx` is transpiled into Javascript, using [Babel]()

So, update your `webpack.config.js` file to look like this:

```javascript
var webpack = require('webpack');
var path = require('path');
var DIST = path.resolve(__dirname, 'dist/');
var SRC = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    devtool: 'source-map',
    entry: {
        // NOTE: Changed entry point to be index.js
        path: SRC + '/index.js'
    },
    output: {
        path: DIST,
        publicPath: 'http://localhost:8080/',
        filename: 'app.js'
    },
    module: {
        rules: [
            {   
                // NOTE: added .jsx extension to use babel 
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)$/,
                loaders: [
                    'style-loader', 'css-loader', 'sass-loader'
                ],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html', inject: 'body'})],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};

module.exports = config;
```

Now Webpack is configured correctly. However, you still need to setup babel in order to transpile the `jsx` syntax into javascript. Firstly, download all required dependencies:

- `npm install babel-core --save-dev`
- `npm install babel-preset-react --save-dev`
- `npm install babel-preset-es2015--save-dev`
- `npm install babel-loader --save-dev`

Lastly, you need to add a `.babelrc` file to your root, with the following contents:

`.babelrc`:
```json
{
  "presets" : ["es2015", "react"]
}
```

Now React should be installed and your Webapp fully configured to use React. In the next section we look at how we can rewrite our raw webapp in React.

# Reactifying your Webapp

Effectively, every webapp's entry point is the `index.html`. This is no different for React. Basically, you can choose arbitrary elements to inject your react code into. In the index.html file below, the only element in the `<body>` tags is a `<div>` with an id. This is the component in which we will inject all react code.

`index.html`:
```html
<!DOCTYPE html>
<html>

    <head>
        <title>React Dev</title>
        <!--Icon-->
        <link rel="shortcut icon" type="image/x-icon" href="./assets/favicon.ico" />
        <!--Font-->
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Quicksand" />
    </head>

    <body>
        <!-- REACT is injected here -->
        <div id="root" />
    </body>

</html>
```

Now, to add our React entry point in the webapp, we need to create an `index.js` file.

`src/index.js`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.js';

ReactDOM.render(<App />, document.getElementById('root'));
```

Here you can see that the root `App` component is injected into the `<div>` which has `id="root"`, in the body of our `index.html`. However, we have not yet created our App component, which is what we'll do next.

`src/app/app.js`:
```jsx
import React from 'react';
require('../style.scss');
require('../favicon.ico');

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="app-titlebar">
                    <img src="./assets/favicon.ico" />
                    <label>React Tutorial 101</label>
                </div>
                <div className="app-content">
                    <p><b>Hello React Developers</b></p>
                    <p>Now you know how to make a basic React website.</p>
                </div>
            </div>
        )
    }
}
```

Everything should have worked just fine. You should see your webapp in the browser, if you've run `npm start`.

>**NOTE:**
>- at the very least, a React component needs a render function
>- the html `class` attribute is called `className` in jsx, because `class` is already a reserved keyword in javascript.
>- make sure that your paths are correct, as some things have been shuffled around

# Adding React Router

The React router keeps changing, as does everything with frontend libraries. This section uses `react-router@4` which (hopefully) will be supported for a while. So, let's get started by installing the dependencies:

- `npm install react-router --save-dev`
- `npm install react-router-dom  --save-dev`

The next step is to wrap your root component around the router:

`src/index.js`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app.js';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App/>
    </Router>
, document.getElementById('root'));
```
Now, we are going to define all routes (pages) in the App component, as follows:

`src/app/app.js`:
```jsx
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import NotFound from './pages/not-found';
require('../style.scss');
require('../favicon.ico');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="app-titlebar">
                    <img src="./assets/favicon.ico" />
                    <label>React Tutorial 101</label>
                </div>
                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/home" component={Home}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>    
        </div>
        )
    }
}
```

But before we can navigate to these pages via the browser URL, we need to create the pages:

`src/app/pages/home.js`:
```jsx
import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>This is the HOME page</h1>
            </div>
        )
    }
}
```

`src/app/pages/not-found.js`:
```jsx
import React from 'react';

export default class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h1><b>404: NOTE Found</b></h1>
                <h2>The page can't be found</h2>
            </div>
        )
    }
}
```

Try modifying the URL in your browser to see if the routing works.