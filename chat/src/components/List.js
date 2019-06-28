import React from 'react';
import './List.css';
import axios from 'axios';

const handler = (email,room) => {
   const guest = {
      email: email,
      room: room
   }

   axios.post('http://localhost:8124/invite',{guest: guest})
   .then(
   )
}

export default ({email,pic,firstname,secondName,room} ) =>
     <div className='user-container'>
        <img className = 'photo'src={pic} alt='user-pic'/>
        <div className ='text-container'>
           <h5 className ='title' >{email}</h5>
           <div className = 'username' >{firstname} {secondName}</div>
           <button className='add btn-info' onClick={()=>{
              handler(email,room)
           }}>ADD</button>
        </div>
     </div>
