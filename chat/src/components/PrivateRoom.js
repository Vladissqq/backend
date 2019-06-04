import React from 'react';



export default class PrivateRoom extends React.Component {

    render(){
        return(
            <form>
                <div>
                <input placeholder = 'name of room'></input>
                </div>
                <div>
                <input placeholder = 'id of user'></input>
                <button className='input-btn btn'> + </button>
                </div>
                <button type="submit"   className='input-btn btn'>Create room</button>
            </form>
        )
    }
}