import React from 'react';
import './navbar.css';
import { Redirect } from "react-router-dom";


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
            <a className="nav-link" href='#/homepage/'>Home</a>
          </li>
          <li className="nav-item">
            <button className='input-btn btn' onClick={localStorage.clear()}>Log out</button>
          </li>
        </ul>
      </div>
    </nav>
  )
}