import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';

const URL = 'ws://localhost:8124';

export default class Chat extends React.Component {
    state = {
        name: '',
        messages: []
    };

    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        };

        this.ws.onmessage = e => {
            const message = JSON.parse(e.data);
            this.addMessage(message);
        }
    }


    addMessage(message) {
        this.setState(state => (
            {
                messages: [message, ...state.messages]
            }
        ))
    }
    submitMessage = function (value) {
        const message = value;
        this.ws.send(JSON.stringify(message));
        this.addMessage(message);
    }

    render() {
        return (
            <div>
                <ChatInput
                    onSubmitMessage={(value) => {
                        this.submitMessage(value)
                    }}
                />
                {this.state.messages.map((message, index) =>
                    <Messager
                        key={index}
                        message={message.message}
                        
                    />,
                )}
            </div>
        )
    }
}