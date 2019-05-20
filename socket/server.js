const net = require('net');
const arrClients = [];
const server = net.createServer((c) => {
  arrClients.push(c);
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    console.log(data.toString());
    arrClients.forEach((client) => {
      client.write(data.toString());
    })
  });
});

server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

// setTimeout(()=>console.log(arrClients),5000)