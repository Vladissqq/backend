import React from 'react';
import './registration.css';
import googleLogo from './google.png';
import axios from 'axios';
import { Redirect } from "react-router-dom";


export default class Registration extends React.Component {

  state = {
    userName: undefined,
  };

  componentWillMount() {
    const storage = localStorage.getItem("userName");
    this.setState({userName: storage})
  }
  componentDidMount() {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    window.gapi.load('auth2', function () {
      window.gapi.auth2
        .init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        })
        .then(_onInit, _onError)
    })
  }
  signIn = (e) => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
      // токен
      const id_token = googleUser.getAuthResponse().id_token;
      const tok = { id_token: 'lol' };
      return axios.post('http://localhost:8124/auth', {tokken: id_token})
        .then(
          (res) => {
            window.localStorage.setItem("email_chat",res.data)
          }
        );
    
    }).then(() => {
      console.log('history push')
      this.props.history.push('/#/homepage')
    })
    ;

    
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  };
  register(e) {
    e.preventDefault()
    window.localStorage.setItem("userName",e.target.elements.name.value);
    window.localStorage.setItem("email_chat",e.target.elements.email.value);
    const user = {
      email: e.target.elements.email.value,
      userName: 'User'
    };

    if(e.target.elements.name.value !== '') {
      user.userName = e.target.elements.name.value
    };



    axios.post('http://localhost:8124/register', {info: user})
    .then(
    )
    this.props.history.push('/#/homepage');
  }
  render() {
    return (
      <div>
        {
          localStorage.getItem('email_chat') ?
          <Redirect to='/homepage' />
          :
          <div>
        <form onSubmit = {(e) => this.register(e, this.props)}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input value={this.state.userName}name='name' type="text" className="form-control" id="name" placeholder="Name" />
          </div>
          <button type="submit" className="btn btn-info">Submit</button>
        </form>
        <div className="App">
          <header className="App-header">
            <button onClick={this.signIn} className="btn btn-info">Log in  <img className='img' src={googleLogo} /></button>

            <button onClick={this.signOut} className="btn btn-info">Log out</button>
          </header>
        </div>
      </div>
        }
      </div>
    )
  };
} 