import * as React from "react";
import { Component } from 'react';
import './App.css';
import * as logo from './logo.svg';
import {getBrowserAppName} from 'mypackage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {debugger
        console.log(getBrowserAppName())
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React!</h2>
                </div>
                <p className="App-intro">
                    To get started, edit
                    <code>src/App.js</code>
                    and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
