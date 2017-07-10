import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import NotFound from './pages/not-found';
import Navbar from './components/navbar';
require('../style.scss');
require('../favicon.ico');

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar appTitle="React 101" />

                <div className="app-content">
                    <Switch>
                        <Route exact path="/" component={Home}/> 
                        <Route exact path="/home" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>    
        </div>
        )
    }
}
