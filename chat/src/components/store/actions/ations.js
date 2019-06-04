export function write(message) {
    return {
        type: 'MESSAGE',
        payload: message
    }
};

export function idOnline (arr) {
    return {
        type: 'ONLINE',
        payload: arr
    }
};