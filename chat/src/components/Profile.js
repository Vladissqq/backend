import React from 'react';
import './Profile.css';

export default class Profile extends React.Component {
    render() {
        const {info} = this.props;
        console.log(info);
        
        return (
            <div className='profile-container'>
                <div className='Photo'>
                    <img src={info.picture} alt='user-pic' />
                </div>
                <div className='username'>
                {info.firstName} {info.secondName}
                </div>
            </div>
        )
    }
}