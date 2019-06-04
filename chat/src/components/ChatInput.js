import React from 'react';
import './ChatInput.css';

export default class ChatInput extends React.Component {
    state = {
        message: ''
    };



    render() {
        return (
            <form className='form-input'  name = 'test'onSubmit={(e) => {
                e.preventDefault();
                this.setState({ message: e.target.elements.inputMessage.value });
                this.props.onSubmitMessage({ message: e.target.elements.inputMessage.value });
                console.log(test)
            }}>
                <div className="input-group mb-3">
                    <input name='inputMessage' className='input-message form-control'></input>
                    <div className="input-group-append">
                        <button type="submit"   className='input-btn btn' >SEND</button>
                        {/* <Button type='link' className='input-btn'>SEND</Button> */}
                    </div>
                </div>
            </form>
        )
    }
}