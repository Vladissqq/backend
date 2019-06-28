import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import LeaveBtn from './LeaveRoom';
import ClientList from './List';
import PrivateRoom from './PrivateRoom';
import Profile from './Profile';
import './Chat.css';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { write } from './store/actions/ations';
import { idOnline } from './store/actions/ations';
import { room } from './store/actions/ations';
import { inf } from './store/actions/ations';
import { users} from './store/actions/ations';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import RoomList from './RoomsList';



const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    state = {
        room: 'all',
        info: null
    }

    componentWillMount() {

    }

    componentDidMount() {
        axios.get('http://localhost:8124/get_info')
            .then(
                (res) => {
                    const info = {
                        email: res.data.email,
                        firstName: res.data.firstName,
                        secondName: res.data.secondName,
                        picture: res.data.picture
                    };

                    this.addInfo(info)
                }
            );

        axios.get('http://localhost:8124/users')
            .then(
                (res) => {
                    this.addUsers(res.data);
                }
            )
            axios.post('http://localhost:8124/rooms',{email: localStorage.getItem('email_chat')})
            .then(
                (res) => {
                    res.data.forEach((el) => {
                        this.addRoom(el);
                    })
                }
            )   


        this.ws = openSocket(URL);
        this.ws.on('connect', () => {
            console.log('connected');
            this.ws.emit('send_email',localStorage.getItem('email_chat'));
        });

        this.ws.on('input message', (message) => {
            this.addMessage(message);
        });

        this.ws.on('input room', (message) => {
            this.addMessage(message);   
        });

        this.ws.on('join',(room) => {
            this.ws.emit('accept_invite',room)
        })

        this.ws.on('server message', (message) => {
            alert(message);
        });
        this.ws.on('invite', (message) => {
            this.addMessage(message)
        });
        this.ws.on('history', (hist) => {
            hist.messages.forEach(e => {
                this.addMessage(e);
            });
        })
    };

    renderId = (arr) => {
        this.props.pushIdToStore(arr)
    };

    addMessage = (message) => {
        this.props.addMesageToStore(message);
    };

    addInfo = (info) => {
        this.props.addInfoToStore(info);
    };

    addRoom = (obj) => {
        this.props.addRoomToStore(obj);
    };

    addUsers = (arr) => {
        this.props.addUsersToStore(arr)
    }

    submitMessage = (obj) => {
        obj.room = this.state.room;
        obj.name = this.props.info.info.firstName;
        this.ws.emit('output message', obj);
        this.addMessage(obj);
    };
    submitRoom = (value) => {
        const roomObj = value;
        this.setState({ room: value.room })
        this.addRoom(roomObj.room);
        this.ws.emit('create', roomObj);
    };
    leaveRoom = () => {
        this.ws.emit('leave room', this.state.room);
        this.setState({ room: null });
    }

    render() {

        console.log(this.props.rooms);

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
                            this.props.rooms.rooms.map((room,index) => 
                                <RoomList
                                    key={index}
                                    room={room}
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


function mapDispatchToProps(dispatch) {
    return {
        addMesageToStore: (message) => dispatch(write(message)),
        pushIdToStore: (arr) => dispatch(idOnline(arr)),
        addRoomToStore: (obj) => dispatch(room(obj)),
        addInfoToStore: (obj) => dispatch(inf(obj)),
        addUsersToStore: (arr) => dispatch(users(arr))
    }
}
function mapStateToProps(state) {
    return {
        message: state.message,
        ids: state.id,
        rooms: state.room,
        info: state.info,
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);