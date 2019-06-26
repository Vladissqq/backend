import React from 'react';
import './navbar.css';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


export default function navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light ">
      <a className="navbar-brand" >Menu</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <button className='input-btn btn'> Home </button>
          </li>
          <li className="nav-item">
            <form>
              <button className='input-btn btn' onClick={() => {
                localStorage.clear();
                history.push('/');
              }}>Log out</button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  )
}