import React from 'react';



export default class PrivateRoom extends React.Component {


  render() {
    const formObj = {
      room: null,
      email: localStorage.getItem('email_chat')
    };
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        formObj.room = e.target.elements.nameRoom.value;
        this.props.onSubmitRoom(formObj);
      }}>
        <div className="form-group">
          <label htmlFor="InputRoom">  Create room</label>
          <input type="text" className="form-control" id="InputRoom" aria-describedby="emailHelp" placeholder="Enter room name " name='nameRoom' />
          <small id="emailHelp" className="form-text text-muted">Create your personal romm and invite your friends.</small>
        </div>
        <button type="submit" className="btn btn-info">Create></button>
      </form>
    )
  }
}
