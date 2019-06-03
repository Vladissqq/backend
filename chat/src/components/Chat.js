import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import ClientList from './List';
import './Chat.css';
import openSocket from 'socket.io-client';


const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    state = {
        name: '',
        messages: [],
        list: []
    };



    componentDidMount() {
        this.ws = openSocket(URL);
        this.ws.on('connect',()=> {
            console.log('connected');
        });

        this.ws.on('input message',(message) => {
            this.addMessage(message);
        })

    


        };
    //     this.ws.onclose = () => {
    //         console.log('disconnected')
    //         // automatically try to reconnect on connection loss
    //         this.setState({
    //             ws: new WebSocket(URL),
    //         })

    //     };
    // }
    // renderList(cli) {
    //     this.setState(state => (
    //         {
    //             list: cli
    //         }
    //     ))

    // }
    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }));

    submitMessage = (value) => {
        const message = value;
        this.ws.emit('output message',message);
        this.addMessage(message);
        console.log(message);
    }

    render() {
        return (
            <div className='chat'>

                <div className='sider'>
                    {this.state.list.map((list, index) =>
                        <ClientList
                            key={index}
                            port={list.port}
                        />
                    )}
                </div>
                <div className='message-container' >
                    {this.state.messages.map((message, index) =>
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

export {Chat};