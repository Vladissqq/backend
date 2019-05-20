const net = require('net');
const arrClients = [];
const server = net.createServer((c) => {
  arrClients.push({
    port: c.remotePort,
    c: c
  });
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {
    
    console.log(data.toString().trim());
    if(data.toString().trim() == 'l'){
      const arrPorts = [];
      arrClients.forEach((client) => {
        arrPorts.push(client.port);
        
      });
      c.write(arrPorts.join(';'));
    }
    // else {
    //   arrClients.forEach((client) => {
    //     client.c.write( ` client:${c.remotePort}   :${data.toString()}`);
    //   })
    // }
  });
});

server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});

// setTimeout(()=>console.log(arrClients),5000)