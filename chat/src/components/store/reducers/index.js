import {createStore, combineReducers} from 'redux';
import {messageReducer} from './messageReducer';
import {idReducer} from './idReducer';
import {roomReducer} from './roomReducer';
import {infoReducer} from './infoReducer';
import {usersReducer} from './usersReducer';

const reducer = combineReducers({
    message: messageReducer,
    id: idReducer,
    room: roomReducer,
    info: infoReducer,
    users: usersReducer
});


const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {
    store
};