const Websocket = require('ws');
const arrPorts = [];
const arrClients = [];
const arraysPrivate = {
  count: 0
};

const rList = /^.l/g;
const rPort = /^(.p\d{5})$/gm;
const rJoin = /^(.p\d{6})$/gm;
const rQuit = /^.r/g;

const rand = function rand(min, max) {
  let rand = (max - min) * Math.random() + min;
  rand = Math.round(rand);
  return rand;
};


const server = new Websocket.Server({
  port: 8124
});

server.on('connection', (c) => {
  const obj = {
    port: null,
    c: c,
    private: null
  };
  const cPort = rand(1000, 9999);
  obj.port = cPort;
  arrClients.push(obj)
  arrPorts.push(cPort);
  const objList = {
    message: null,
    list: arrPorts
  }
  console.log(arrClients.length);
  console.log(arrPorts);
  c.send(JSON.stringify(objList));

  const finderC = function finderC(obj) {
    return obj.port === cPort;
  };
  // 'connection' listener

  // console.log(arrClients);

  c.onclose = () => {
    const index = arrClients.findIndex(finderC);
    arrClients.splice(index,1);
    arrPorts.splice(index,1);
    console.log('client disconnected');
  };

  c.onmessage = (e) => {
    const dataJSON = e.data;
    const data = JSON.parse(e.data);
    const dat = data.message.toString().trim();

    
    const objMessage = {
      message: null,
      list: null
    };
    objMessage.message = dat;
    console.log(objMessage);


    let i = arraysPrivate.count;

    const finder = function finder(obj) {
      return obj.port.toString() === dat.toString().substring(2).trim();
    };

    const returnRoom = function finderRoom(i) {
      return dat.toString().substring(2).trim();
    };

    const returnStatus = function returnStatus(obj) {
      return obj.private === null;
    };

    const notThisUser = function notThisUser(obj) {
      return obj.port !== cPort;
    }



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

    // // if (rPort.test(dat)) {
    // //   const guest = arrClients.find(finder);
    // //   const inviter = arrClients.find(finderC);
    // //   const indInviter = arrClients.findIndex(finderC);
    // //   arrClients[indInviter].private = `${c.remotePort}${i}`;
    // //   arraysPrivate[`${c.remotePort}${i}`] = [inviter];
    // //   guest.c.send(`You was invite in private chat. command for join: /p${c.remotePort}${i}`);
    // // };

    // if (rJoin.test(dat)) {
    //   const guest = arrClients.find(finderC);
    //   const indGuest = arrClients.findIndex(finderC);
    //   arrClients[indGuest].private = dat.toString().substring(2).trim();
    //   console.log(arrClients[indGuest].private);
    //   arraysPrivate[returnRoom()].push(guest);
    // };




    if (dat[0] !== '/') {
      const indUser = arrClients.findIndex(finderC);

      if (arrClients[indUser].private === null) {
        const f = arrClients.filter(returnStatus);
        const filtr = f.filter(notThisUser);
        
        filtr.forEach((obj) => {
          obj.c.send(JSON.stringify(objMessage));
        });
      }
      else {
        const indUser = arrClients.findIndex(finderC);
        const idOfRoom = arrClients[indUser].private.toString();
        const room = arraysPrivate[idOfRoom];
        const filter = room.filter(notThisUser);
        filter.forEach(c => c.c.send(`private-user-${cPort}: ${data}`));
      }
    };
    // arraysPrivate[i] = arrClients[0];
    arraysPrivate.count++;
    // console.log(arraysPrivate)
  };
});

server.onerror = (err) => {
  throw err;
};

