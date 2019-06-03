export function write(message) {
    return {
        type: 'MESSAGE',
        payload: message
    }
}