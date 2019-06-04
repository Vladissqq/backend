import {createStore, combineReducers} from 'redux';
import {messageReducer} from './messageReducer';
import {idReducer} from './idReducer';

const reducer = combineReducers({
    message: messageReducer,
    id: idReducer
});


const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {
    store
};