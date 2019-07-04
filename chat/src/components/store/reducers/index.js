import {createStore, combineReducers, applyMiddleware} from 'redux';
import {messageReducer} from './messageReducer';
import {idReducer} from './idReducer';
import {roomReducer} from './roomReducer';
import {infoReducer} from './infoReducer';
import {usersReducer} from './usersReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const reducer = combineReducers({
    message: messageReducer,
    id: idReducer,
    room: roomReducer,
    info: infoReducer,
    users: usersReducer
});

const store = createStore(
    reducer, 
    applyMiddleware(thunk,logger)
);

export {
    store
};