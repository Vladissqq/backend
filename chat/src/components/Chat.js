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
import axios from 'axios';


const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    state = {
        room: 'all',
        info: null
    }

    componentWillMount() {
        axios.get('http://localhost:8124/get_info')
            .then(
                (res) => {
                    const info = {
                        email: res.data.email,
                        firstName: res.data.given_name,
                        secondName: res.data.family_name,
                        picture: res.data.picture
                    };
                    console.log(info)
                    this.addInfo(info)
                }
            );
    }

    componentDidMount() {
        this.ws = openSocket(URL);
        this.ws.on('connect', () => {
            console.log('connected');
        });

        this.ws.on('input message', (message) => {
            this.addMessage(message);
        });

        this.ws.on('input room', (message) => {
            this.addMessage(message);
            console.log(message);
        });

        this.ws.on('send online', (arr) => {
            this.renderId(arr);
            console.log(arr);
        });
        this.ws.on('server message', (message) => {
            alert(message);
        });
        this.ws.on('invite', (message) => {
            this.addMessage(message)
        });
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

    submitMessage = (obj) => {
        obj.room = this.state.room;
        obj.name = this.props.info.info.firstName;
        this.ws.emit('output message', obj);
        this.addMessage(obj);
    };
    submitRoom = (value) => {
        const room = value;
        console.log(room);
        this.setState({ room: value.room })
        this.addRoom(room);
        this.ws.emit('create', room);
    };
    leaveRoom = () => {
        this.ws.emit('leave room', this.state.room);
        this.setState({ room: null });
    }

    render() {
        console.log(this.props);
        return (
            <div className='chat'>
                <div className='sider'>
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
                    {this.props.ids.ids.map((id, index) =>
                        <ClientList
                            key={index}
                            port={id}
                        />
                    )}
                </div>
                <div className='sider'>
                    <Profile info={this.props.info.info} />
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
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        addMesageToStore: (message) => dispatch(write(message)),
        pushIdToStore: (arr) => dispatch(idOnline(arr)),
        addRoomToStore: (obj) => dispatch(room(obj)),
        addInfoToStore: (info) => dispatch(inf(info))
    }
}
function mapStateToProps(state) {
    return {
        message: state.message,
        ids: state.id,
        rooms: state.room,
        info: state.info
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);