import React, { Component } from 'react'
import Chat from './Chat';
import Navbar from './Navbar';
import { HashRouter, Route, Switch } from "react-router-dom";
import { Login } from './Login';
import { Provider } from 'react-redux';
import { store } from './store/reducers/index';
import { CheckLocal } from './CheckLocal';


class App extends Component {
  render() {
    return (

      <Provider store={store}>
        <div className="App">
          <Navbar />
          <HashRouter>
            <Switch>
              <Route exact path='/' component={CheckLocal} />
              <Route path='/registration' component={Login} />
              <Route path='/homepage' component={Chat} />
            </Switch>
          </HashRouter>
        </div>
      </Provider>

    )
  }
}

export default App
