
    const client = new WebSocket("ws://localhost:8124");

    client.onopen = () => {
        console.log('connected to server!');
        client.send(message);
        // process.stdin.on('data', (d) => {
        //         client.send(d.toString());
        // });
    }

    // 'connect' listener
    // console.log('connected to server!');
    // process.stdin.on('data', (d) => {
    //     client.write(d.toString());


    client.onmessage = (data) => {
        console.log(data.toString());
        if (data.toString() === 'hello') {
            client.send('hello server');
        }
    }
    client.onclose = () => {
        console.log('disconnected from server');
    }


