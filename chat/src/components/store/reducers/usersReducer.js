const defaultState = {
    users: []
};

export function usersReducer(state = defaultState, action) {
    if(action.type === 'USERS'){
        return {
            users: action.payload
        }
    }
    return state
}