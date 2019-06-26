import { Redirect } from "react-router-dom";
import React from 'react';


export  function CheckLocal() {
    return (
        localStorage.getItem('email_chat') ? 
        <Redirect to='/homepage' />
        :
        <Redirect to='/registration'/>
    )
}