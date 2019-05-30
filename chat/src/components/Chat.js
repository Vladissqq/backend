import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import ClientList from './List';
import './Chat.css'


const URL = 'ws://localhost:8124';
class Chat extends React.Component {
    state = {
        name: '',
        messages: [],
        list: []
    };



    componentDidMount() {
        this.ws = new WebSocket(URL);
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        this.ws.onmessage = e => {
            const data = JSON.parse(e.data);
            const message = { message: data.message };
            const list = [];
            
            // const list = {port: data.list};

            if (data.list !== null) {
                data.list.forEach(el => {
                    list.push({ port: el });
                });
                this.renderList(list);
            }
            if (message !== null) {
                this.addMessage(message);
            };
            console.log(this.state.list);
            console.log(this.state.messages)

        };
        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })

        };
    }
    renderList(cli) {
        this.setState(state => (
            {
                list: cli
            }
        ))

    }
    addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }));

    submitMessage = (value) => {
        const message = value;
        this.ws.send(JSON.stringify(message));
        this.addMessage(message);
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