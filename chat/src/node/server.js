const Websocket = require('ws');

const arrClients = [];
const arraysPrivate = {
  count: 0
};

const rList = /^.l/g;
const rPort = /^(.p\d{5})$/gm;
const rJoin = /^(.p\d{6})$/gm;
const rQuit = /^.r/g;

const server = new Websocket.Server({
  port: 8124
  });

server.on('connection', (c) => {
  arrClients.push({
    port: c.remotePort,
    c: c,
    private: null
  });
  // 'connection' listener

  c.onclose = () => {
    console.log('client disconnected');
  };

  c.onmessage = (e) => {
    server.clients.forEach(
      (c) =>{
        c.send(e.data)
      }
    )
    // const data = e.data;
    // console.log(data);
    // const cPort = c.remotePort;
    // let dat = data.toString().trim();
    // let i = arraysPrivate.count;

    // const finder = function finder(c) {
    //   return c.port.toString() === dat.toString().substring(2).trim();
    // };
    // const finderC = function finderC(c) {
    //   return c.port === cPort;
    // };
    // const returnRoom = function finderRoom(i) {
    //   return dat.toString().substring(2).trim();
    // };

    // const returnStatus = function returnStatus(c) {
    //   return c.private === null;
    // };

    // const notThisUser = function notThisUser(c) {
    //   return c.port !== cPort;
    // }



    // console.log(c.remotePort);
    // if (rQuit.test(dat)) {
    //   const indexUser = arrClients.findIndex(finderC);
    //   console.log('indexUse_' + indexUser);

    //   if (arrClients[indexUser].private !== null) {
    //     const room = arraysPrivate[arrClients[indexUser].private];
    //     const indexUserInPrivate = room.findIndex(finderC);
    //     arrClients[indexUser].private = null;
    //     console.log(arrClients);
    //     room.splice(indexUserInPrivate, 1);
    //     console.log('------------');
    //     console.log(room);
    //   }

    // }

    // if (rPort.test(dat)) {
    //   const guest = arrClients.find(finder);
    //   const inviter = arrClients.find(finderC);
    //   const indInviter = arrClients.findIndex(finderC);
    //   arrClients[indInviter].private = `${c.remotePort}${i}`;
    //   arraysPrivate[`${c.remotePort}${i}`] = [inviter];
    //   guest.c.send(`You was invite in private chat. command for join: /p${c.remotePort}${i}`);
    // };

    // if (rJoin.test(dat)) {
    //   const guest = arrClients.find(finderC);
    //   const indGuest = arrClients.findIndex(finderC);
    //   arrClients[indGuest].private = dat.toString().substring(2).trim();
    //   console.log(arrClients[indGuest].private);
    //   arraysPrivate[returnRoom()].push(guest);
    // };

    // if (rList.test(data.toString().trim())) {
    //   const arrPorts = [];
    //   arrClients.forEach((client) => {
    //     arrPorts.push(client.port);
    //   })
    //   c.write(arrPorts.join('; '))
    // };


    // if (dat[0] !== '/') {
    //   const indUser = arrClients.findIndex(finderC);
    //   if (arrClients[indUser].private === null) {
    //     const f = arrClients.filter(returnStatus);
    //     const filtr = f.filter(notThisUser);
    //     filtr.forEach((c) => {
    //       c.c.send(`user--${cPort}: ${dat}`);
    //     });
    //   }
    //   else {
    //     const indUser = arrClients.findIndex(finderC);
    //     const idOfRoom = arrClients[indUser].private.toString();
    //     const room = arraysPrivate[idOfRoom];
    //     const filter = room.filter(notThisUser);
    //     filter.forEach(c => c.c.send(`private-user-${cPort}: ${dat}`));
    //   }
    // };
    // arraysPrivate[i] = arrClients[0];
    // arraysPrivate.count ++;
    // console.log(arraysPrivate)
  };
});

server.onerror = (err) => {
  throw err;
};

