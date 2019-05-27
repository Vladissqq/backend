
const client = new WebSocket("ws://localhost:8124");

client.on('open', () => {
    console.log('connected to server!');
    process.stdin.on('data', (d) => {
            client.send(d.toString());
    });
});

    // 'connect' listener
    // console.log('connected to server!');
    // process.stdin.on('data', (d) => {
    //     client.write(d.toString());


client.on('message', (data) => {
    console.log(data.toString());
    if (data.toString() === 'hello') {
        client.send('hello server');
    }
});
client.on('end', () => {
    console.log('disconnected from server');
});

