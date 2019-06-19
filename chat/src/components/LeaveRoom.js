import React from 'react';
import './LeaveRoom.css';


export default function (props) {
    return (
        <button className = ' btn btn-outline-info' onClick = {() =>{
            props.onLeaveRoom();
        }}>Leave room</button>
    )
}
