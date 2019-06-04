import React from 'react';



export default class PrivateRoom extends React.Component {
    

    render(){
        const formObj= {
            room: null,
            guest: null
        };
        return(
            <form onSubmit = {(e)=>{
                e.preventDefault(); 
                formObj.room = e.target.elements.nameRoom.value;
                formObj.guest = e.target.elements.guest.value;
                this.props.onSubmitRoom(formObj);
            }}>
                <div>
                <input placeholder = 'name of room' name = 'nameRoom'></input>
                </div>
                <div>
                <input placeholder = 'id of user' name = 'guest'></input>
                </div>
                <button type="submit"   className='input-btn btn'>Create room</button>
            </form>
        )
    }
}