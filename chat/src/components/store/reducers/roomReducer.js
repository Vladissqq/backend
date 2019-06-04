const defaultState = {
    rooms: [],
};

export function roomReducer(state = defaultState, action) {
    if(action.type === 'ROOM'){
        return {
            rooms: [action.payload, ...state.rooms]
        }
    }
    return state
}