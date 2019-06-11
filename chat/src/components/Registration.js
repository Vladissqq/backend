import React from 'react';
import './registration.css';
import googleLogo from './google.png'

export default class Registration extends React.Component {
    componentDidMount() {
        const _onInit = auth2 => {
          console.log('init OK', auth2)
        }
        const _onError = err => {
          console.log('error', err)
        }
        window.gapi.load('auth2', function() {
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
        
          // метод возвращает объект пользователя
          // где есть все необходимые нам поля
          const profile = googleUser.getBasicProfile()
          console.log('ID: ' + profile.getId()) // не посылайте подобную информацию напрямую, на ваш сервер!
          console.log('Full Name: ' + profile.getName())
          console.log('Given Name: ' + profile.getGivenName())
          console.log('Family Name: ' + profile.getFamilyName())
          console.log('Image URL: ' + profile.getImageUrl())
          console.log('Email: ' + profile.getEmail())
    
          // токен
          const id_token = googleUser.getAuthResponse().id_token
          console.log('ID Token: ' + id_token)
        })
      }
      signOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
          console.log('User signed out.')
        })
    }
    render() {
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label forHtml="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-info">Submit</button>
                </form>
                <div className="App">
                    <header className="App-header">
                        <button onClick={this.signIn} className="btn btn-info">Log in  <img className = 'img' src={googleLogo} /></button>
                        
                        <button onClick={this.signOut} className="btn btn-info">Log out</button>
                    </header>
                </div>
            </div>
        )
    };
} 