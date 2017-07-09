# Tutorial: React

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

