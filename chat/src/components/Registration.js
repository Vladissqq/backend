import React from 'react';
import './registration.css';
import googleLogo from './google.png';
import axios from 'axios';

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
  signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {
      // токен
      const id_token = googleUser.getAuthResponse().id_token;
      const tok = { id_token: 'lol' };
      axios.post('http://localhost:8124/auth', {tokken: id_token})
        .then(
          (res) => {
            console.log(res.data);
          }
        );
    
    })
  };
  signOut = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
      console.log('User signed out.')
    })
  };
  register = (e) => {
    localStorage.setItem("userName",e.target.elements.name.value);
    localStorage.setItem("email",e.target.elements.email.value);
  }
  render() {
    return (
      <div>
        <form onSubmit = {(e) =>{
          this.register(e);
        }}>
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
    )
  };
} 