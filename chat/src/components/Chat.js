import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import ClientList from './List';
import PrivateRoom from './PrivateRoom'
import './Chat.css';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';
import {write} from './store/actions/ations';
import {idOnline} from './store/actions/ations';


const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    

    componentDidMount() {
        this.ws = openSocket(URL);
        this.ws.on('connect',()=> {
            console.log('connected');
        });

        this.ws.on('input message',(message) => {
            this.addMessage(message);
        });

        this.ws.on('send online',(arr)=>{
            this.renderId(arr);
            console.log(arr);
        })

        };

        renderId = (arr) => {
            this.props.pushIdToStore(arr)
        };

        addMessage = (message) => {
            this.props.addMesageToStore(message);
            
        };

    submitMessage = (value) => {
        const message = value;
        this.ws.emit('output message',message);
        this.addMessage(message);
        // console.log(message);
    }

    render() {
        console.log(this.props);
        return (
            <div className='chat'>
                <div className='sider'>
                <PrivateRoom/>
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


function mapDispatchToProps(dispatch){
    return{
        addMesageToStore: (message)=> dispatch(write(message)),
        pushIdToStore: (arr)=> dispatch(idOnline(arr))
    }
}
function mapStateToProps(state){
    return{
        message: state.message,
        ids: state.id
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);