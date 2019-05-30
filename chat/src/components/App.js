import React, { Component } from 'react'
import {Chat} from './Chat';
import Navbar from './Navbar';
import { HashRouter, Route, Switch} from "react-router-dom";
import {Login} from './Login';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <HashRouter>
          <div>
            <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/homepage' component={Chat} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    )
  }
}

export default App