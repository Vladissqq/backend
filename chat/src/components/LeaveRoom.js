import React from 'react';


export default function (props) {
    return (
        <button className = ' btn btn-dark' onClick = {() =>{
            props.onLeaveRoom();
        }}>LEAVE ROOM</button>
    )
}
