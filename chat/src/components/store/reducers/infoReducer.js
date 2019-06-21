const defaultState = {
    info: {},
};

export function infoReducer(state = defaultState, action) {
    if(action.type === 'INFO'){
        return {
            info: action.payload
        }
    }
    return state
}