const net = require('net');
const client = net.createConnection({ port: 8124 }, () => {
    // 'connect' listener
    console.log('connected to server!');
    process.stdin.on('data', (d)=> {
       client.write(d.toString());
        
    });
});
client.on('data', (data) => {
    console.log(data.toString());
     if(data.toString() === 'hello'){
        client.write('hello server');
    }
});
client.on('end', () => {
    console.log('disconnected from server');
});

