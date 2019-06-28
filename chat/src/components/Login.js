import React from 'react';
import Registration from './Registration';
import './login.css';
 class Login extends React.Component {
    render(){
        return(
            <div className = 'registraition-form--container'>
                <Registration history = {this.props.history}/>
            </div>
        )
    }
}

export {Login};