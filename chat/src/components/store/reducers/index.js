import {createStore, combineReducers} from 'redux';
import {messageReducer} from './reducer';

const reducer = combineReducers({
    message: messageReducer
});


const store = createStore(
    reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export {
    store
};