import React from 'react';
import { join } from 'path';


export default ({room,join}) =>
     <div className='user-container'>
        {room} <p><button onClick={()=> {
           join(room)
        }}>Join</button></p>
     </div>
