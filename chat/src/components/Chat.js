import React from 'react';
import ChatInput from './ChatInput';
import Messager from './Messager';
import ClientList from './List';

const URL = 'ws://192.168.0.133:8124';

export default class Chat extends React.Component {
    state = {
        name: '',
        messages: [],
        list: []
    };

    ws = new WebSocket(URL);

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        this.ws.onmessage = e => {
            const data = JSON.parse(e.data);
            const message = {message: data.message};
            const list = data.list;
           
            if (list !== null) {
                
                this.renderList(list);
            }
            console.log(data);
            if(message !== null){
                this.addMessage(message);
            }; 
            console.log(this.state);

        };
    }
    renderList(cli) {
        this.setState(state => (
            {
                list: [cli]
            }
        ))
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
                {this.state.list.map((list,index) => 
                    <ClientList 
                    key={index}
                    port={list}
                    />
                )}
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