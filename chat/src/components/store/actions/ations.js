import axios from 'axios';

export function write(message) {
  return {
    type: 'MESSAGE',
    payload: message
  }
};

export function idOnline(arr) {
  return {
    type: 'ONLINE',
    payload: arr
  }
};

export function roomAction(formData) {
  return {
    type: 'ROOM',
    payload: formData
  }
};

export function inf(info) {
  return {
    type: 'INFO',
    payload: info
  }
};

export function usersAction(users) {
  return {
    type: 'USERS',
    payload: users
  }
}

export const getUsers = () => {
  return (dispatch) => {
    axios.get('http://localhost:8124/users')
      .then(
        (res) => {
          dispatch(usersAction(res.data));
        }
      )
  }
}

export const getInfo = () => {
  return (dispatch) => {
    axios.get('http://localhost:8124/get_info')
      .then(
        (res) => {
          const info = {
            email: res.data.email,
            firstName: res.data.firstName,
            secondName: res.data.secondName,
            picture: res.data.picture
          };
          dispatch(inf(info))
        }
      );
  }
}

export const getRooms = () => {
  return (dispatch) => {
    axios.post('http://localhost:8124/rooms', { email: localStorage.getItem('email_chat') })
      .then(

        (res) => {
          dispatch(roomAction(res.data))
        }
      )
  }
}