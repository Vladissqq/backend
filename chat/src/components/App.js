import React, { Component } from 'react'
import Chat from './Chat';
import 'antd/dist/antd.css';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat/>
      </div>
    )
  }
}

export default App