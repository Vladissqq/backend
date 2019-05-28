import React from 'react';
import { Input } from 'antd';

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
                <Input name = 'inputMessage'></Input>
                <input type="submit" value={'Send'} />
            </form>
        )
    }
}