import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import LeaveBtn from './LeaveRoom';
import ClientList from './List';
import PrivateRoom from './PrivateRoom'
import './Chat.css';
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import { write } from './store/actions/ations';
import { idOnline } from './store/actions/ations';
import { room } from './store/actions/ations';


const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    state = {
        room: null,
    }

    componentDidMount() {
        this.ws = openSocket(URL);
        this.ws.on('connect', () => {
            console.log('connected');
        });

        this.ws.on('input message', (message) => {
            this.addMessage(message);
        });

        this.ws.on('input room',(message) => {
            this.addMessage(message);
            console.log(message);
        });

        this.ws.on('send online', (arr) => {
            this.renderId(arr);
            console.log(arr);
        });
        this.ws.on('server message', (message) => {
            alert(message);
        })

    };

    renderId = (arr) => {
        this.props.pushIdToStore(arr)
    };

    addMessage = (message) => {
        this.props.addMesageToStore(message);

    };

    addRoom = (obj) => {
        this.props.addRoomToStore(obj);
    };

    submitMessage = (value) => {
        let emit = null;
        if (this.state.room === null){
            emit = 'output message';
        }
        else{
            emit = 'room message';
        }
        const message = value;
        message.room = this.state.room;
        console.log(message)
        this.ws.emit(emit, message);
        this.addMessage(message);
    };
    submitRoom = (value) => {
        const room = value;
        console.log(room);
        this.setState({room: value.room})
        this.addRoom(room);
        this.ws.emit('create',room);
    };
    leaveRoom = () => {
        this.ws.emit('leave room',this.state.room);
        this.setState({room: null});     
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
                    onLeaveRoom = {() =>{
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
                <div className='message-container' >
                    {this.props.message.messages.map((message, index) =>
                        <Messager
                            key={index}
                            message={message.message}

                        />,
                    )}
                </div>
                <ChatInput
                    onSubmitMessage={(value) => {
                        this.submitMessage(value)
                    }}
                />
            </div>

            // <div className='chat'>
            //     <div className='message-container' >
            //     {this.state.messages.map((message, index) =>
            //         <Messager
            //             key={index}
            //             message={message.message}

            //         />,
            //     )}
            //     </div>



            // </div>
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        addMesageToStore: (message) => dispatch(write(message)),
        pushIdToStore: (arr) => dispatch(idOnline(arr)),
        addRoomToStore: (obj) => dispatch(room(obj))
    }
}
function mapStateToProps(state) {
    return {
        message: state.message,
        ids: state.id,
        rooms: state.room
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);