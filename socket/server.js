const net = require('net');
const arrClients = [];
const arrPrivate = [];

const rList = /^.l/g;
const rPort = /^(.p\d{5})$/gm;

const server = net.createServer((c) => {
  arrClients.push({
    port: c.remotePort,
    c: c,
    private: null
  });
  // 'connection' listener
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });

  c.on('data', (data) => {

    let dat = data.toString().trim();
    if (rList.test(dat)) {
      const arrPorts = [];
      arrClients.forEach((client) => {
        arrPorts.push(client.port);
      });
      c.write(`list: ${arrPorts.join('; ')}`);
    };

    if (rPort.test(dat)) {
      let finder = function finder(c) {
        return c.port.toString() === dat.toString().substring(2).trim();
      }
      const findClient = arrClients.find(finder);
      findClient.c.write(`client:${c.remotePort} was inv you to secret chat ,for join write /p${c.remotePort}`);
      cObj = {
        port: null,
        c: c,
        private: true
      };
      cObj.port = c.remotePort;
      c.private = true;
      if(arrPrivate.length !== 0 ){
        if(arrPrivate[0].port.toString() != dat.toString().substring(2).trim()){
          arrPrivate.push(findClient);
          
        }    
      }
      else{
        
        arrPrivate.push(cObj,findClient);
      };
      
    };

    if (c.private) {
      arrPrivate.forEach((client) => {
        client.c.write(`private--client${c.remotePort}: ${data.toString()}`)
      })
    }
    else {
      arrClients.forEach((client) => {
        client.c.write(` client:${c.remotePort}:${data.toString()}`);
      })
    }

    // console.log(data.toString().trim());
    // if(rList.test(data.toString().trim())){
    //   const arrPorts = [];
    //   arrClients.forEach((client) => {
    //     arrPorts.push(client.port);

    //   });
    //   c.write(`list: ${arrPorts.join('; ')}`);
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