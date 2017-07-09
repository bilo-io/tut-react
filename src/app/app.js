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
