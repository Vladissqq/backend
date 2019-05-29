import React from 'react';
import { Input } from 'antd';
import { Button } from "antd";
import './ChatInput.css';

export default class ChatInput extends React.Component {
    state = {
        message: ''
    };



    render() {
        return (
            <form className='form-input' onSubmit={(e) => {
                e.preventDefault();
                this.setState({ message: e.target.elements.inputMessage.value });
                console.log(this.state.message)
                this.props.onSubmitMessage({ message: e.target.elements.inputMessage.value });
            }}>
                <Input name='inputMessage' className='input-message'></Input>
               <Button type='link'  htmlType="submit" className='input-btn' >SEND</Button>
                {/* <Button type='link' className='input-btn'>SEND</Button> */}

            </form>
        )
    }
}