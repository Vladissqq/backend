import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import LeaveBtn from './LeaveRoom';
import ClientList from './List';
import PrivateRoom from './PrivateRoom';
import Profile from './Profile';
import RoomList from './RoomsList';
import { Redirect } from "react-router-dom";
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { write } from './store/actions/ations';
import { idOnline } from './store/actions/ations';
import { roomAction } from './store/actions/ations';
import { inf } from './store/actions/ations';
import { usersAction } from './store/actions/ations';
import { getUsers } from './store/actions/ations';
import { getInfo } from './store/actions/ations';
import { getRooms } from './store/actions/ations';
import './Chat.css';

const URL = 'ws://localhost:8124';
class Chat extends React.Component {
  state = {
    room: 'all',
    info: null
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.getInfo();
    this.props.getUsers();
    this.props.getRooms();


    this.ws = openSocket(URL);
    this.ws.on('connect', () => {
      console.log('connected');
      this.ws.emit('send_email', localStorage.getItem('email_chat'));
    });

    this.ws.on('input message', (message) => {
      this.props.write(message);
    });

    this.ws.on('input room', (message) => {
      this.props.write(message);
    });

    this.ws.on('join', (room) => {
      this.ws.emit('accept_invite', room)
    })

    this.ws.on('server message', (message) => {
      alert(message);
    });
    this.ws.on('invite', (message) => {
      this.props.write(message)
    });
    this.ws.on('history', (hist) => {
      hist.messages.forEach(e => {
        this.props.write(e);
      });
    })
  };

  submitMessage = (obj) => {
    obj.room = this.state.room;
    obj.name = this.props.info.info.firstName;
    this.ws.emit('output message', obj);
    this.props.write(obj);
  };
  submitRoom = (value) => {
    const roomObj = value;
    this.setState({ room: value.room })
    this.props.roomAction(roomObj.room);
    this.ws.emit('create', roomObj);
  };
  leaveRoom = () => {
    this.ws.emit('leave room', this.state.room);
    this.setState({ room: null });
  }
  join = (room) => {
    this.ws.emit('join_room', room);
  }

  render() {

    console.log(this.props);

    return (<div>
      {localStorage.getItem('email_chat') ?
        <div className='chat'>
          <div className='sider'>
            <div className='form-container'>
              <PrivateRoom
                onSubmitRoom={(value) => {
                  this.submitRoom(value)
                }}
              />
              <LeaveBtn
                onLeaveRoom={() => {
                  this.leaveRoom();
                }}
              />
            </div>
            <div className='users-container'>
              {this.props.users.users.map((user, index) =>
                <ClientList
                  key={index}
                  email={user.email}
                  pic={user.img}
                  firstname={user.firstName}
                  secondName={user.secondName}
                  room={this.state.room}
                />
              )}
            </div>
          </div>
          <div className='sider'>
            <Profile info={this.props.info.info} />
            {
              this.props.rooms.rooms.map((room, index) =>
                <RoomList
                  key={index}
                  room={room}
                  join={this.join}
                />
              )}
          </div>
          <div className='message-container' >
            {this.props.message.messages.map((message, index) =>
              <Messager
                key={index}
                message={message.message}
                name={message.name}
              />,
            )}
          </div>
          <ChatInput
            onSubmitMessage={(value) => {
              this.submitMessage(value)
            }}
          />
        </div>
        :
        <Redirect to='/' />
      }
    </div>

    )
  }
};

function mapStateToProps(state) {
  return {
    message: state.message,
    ids: state.id,
    rooms: state.room,
    info: state.info,
    users: state.users
  }
}

export default connect(mapStateToProps, { write, idOnline, roomAction, inf, usersAction, getUsers, getInfo, getRooms })(Chat);