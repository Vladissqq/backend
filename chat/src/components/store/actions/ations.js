export function write(message) {
    return {
        type: 'MESSAGE',
        payload: message
    }
};

export function idOnline(arr) {
    return {
        type: 'ONLINE',
        payload: arr
    }
};

export function room(formData) {
    return {
        type: 'ROOM',
        payload: formData
    }
};

export function inf(info) {
    return {
        type: 'INFO',
        payload: info
    }
}
