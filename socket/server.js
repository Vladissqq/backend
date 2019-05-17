const net = require('net');
const server = net.createServer((c) => {
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
  setInterval(() => {
    c.write('hello');
  },5000);
  c.pipe(c);
  c.on('data', (data) => {
    console.log(data.toString());
    if(data.toString() === 'hello server'){
        c.write('WORLD');
    }
  });
});

server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});
