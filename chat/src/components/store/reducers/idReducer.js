const defaultState = {
    ids: [],
};

export function idReducer(state = defaultState, action) {
    if(action.type === 'ONLINE'){
        return {
            ids: action.payload
        }
    }
    return state
}