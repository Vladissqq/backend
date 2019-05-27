import React from 'react';

export default class ChatInput extends React.Component  {
    state = {
        message: ''
    };



    render(){
        return(
            <form onSubmit = {(e) => {
                e.preventDefault();
                this.setState({message: e.target.elements.inputMessage.value})
                this.props.onSubmitMessage(this.state);
            }}>
                <input name = 'inputMessage'></input>
                <button>Send</button>
            </form>
        )
    }
}