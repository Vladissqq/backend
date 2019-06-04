const defaultState = {
    messages: [],
};

export function messageReducer(state = defaultState, action) {
    if(action.type === 'MESSAGE'){
        return {
            messages: [action.payload, ...state.messages]
        }
    }
    return state
}