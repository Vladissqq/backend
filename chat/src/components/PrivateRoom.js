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

// <div>
//                 <form>
//                     <div className="form-group">
//                         <label htmlFor="InputRoom">Email address</label>
//                         <input type="text" className="form-control" id="InputRoom" aria-describedby="emailHelp" placeholder="Enter email" name = 'nameRoom' />
//                         <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="exampleInputPassword1">Password</label>
//                         <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="name">Username</label>
//                         <input type="text" className="form-control" id="name" placeholder="Name" />
//                     </div>
//                     <button type="submit" className="btn btn-info">Submit</button>
//                 </form>
//                 <div className="App">
//                     <header className="App-header">
//                         <button  type="submit" className="btn btn-info">Create></button>
//                     </header>
//                 </div>
//             </div>