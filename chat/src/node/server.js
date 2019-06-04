// const Websocket = require('ws');
const io = require('socket.io')();


const arrId = [];
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

io.on('connection', (client) => {
  arrId.push(client.id);
  client.emit('send online',arrId);
  console.log('client connected');
  console.log(arrId.length);

  client.on('disconnect',() =>{
    console.log('client disconnect');
    const index = arrId.findIndex((id) =>{
      return id === client.id;
    });
    arrId.splice(index,1);
    client.emit('send online',arrId);
  });

  client.on('output message',(message) => {
    client.broadcast.emit('input message',message);
  });
  client.on('create',(roomObj)=>{
    console.log(roomObj);
    client.join(roomObj.room);
  })
});


const port = 8124;
io.listen(port);
console.log('listening on port ', port);
// const server = new Websocket.Server({
//   port: 8124
// });

// server.on('connection', (c) => {
//   const obj = {
//     port: null,
//     c: c,
//     private: null
//   };

//   const cPort = rand(10000, 99999);
//   obj.port = cPort;
//   arrClients.push(obj)
//   arrPorts.push(cPort);
//   const objList = {
//     message: null,
//     list: arrPorts
//   }
//   console.log(arrClients.length);
//   console.log(arrPorts);
//   server.clients.forEach(c=> c.send(JSON.stringify(objList)));

//   const finderC = function finderC(obj) {
//     return obj.port === cPort;
//   };
//   // 'connection' listener

//   // console.log(arrClients);

//   c.onclose = () => {
//     const index = arrClients.findIndex(finderC);
//     arrClients.splice(index,1);
//     arrPorts.splice(index,1);
//     console.log('client disconnected');
//   };

//   c.onmessage = (e) => {
//     const dataJSON = e.data;
//     const data = JSON.parse(e.data);
//     const dat = data.message.toString().trim();

    
//     const objMessage = {
//       message: null,
//       list: null
//     };
//     objMessage.message = dat;
//     console.log(objMessage);


//     let i = arraysPrivate.count;

//     const finder = function finder(obj) {
//       return obj.port.toString() === dat.toString().substring(2).trim();
//     };

//     const returnRoom = function finderRoom(i) {
//       return dat.toString().substring(2).trim();
//     };

//     const returnStatus = function returnStatus(obj) {
//       return obj.private === null;
//     };

//     const notThisUser = function notThisUser(obj) {
//       return obj.port !== cPort;
//     }



//     // if (rQuit.test(dat)) {
//     //   const indexUser = arrClients.findIndex(finderC);
//     //   console.log('indexUse_' + indexUser);

//     //   if (arrClients[indexUser].private !== null) {
//     //     const room = arraysPrivate[arrClients[indexUser].private];
//     //     const indexUserInPrivate = room.findIndex(finderC);
//     //     arrClients[indexUser].private = null;
//     //     console.log(arrClients);
//     //     room.splice(indexUserInPrivate, 1);
//     //     console.log('------------');
//     //     console.log(room);
//     //   }

//     // }
//     console.log(rPort.test(dat));
//     if (rPort.test(dat)) {
//       console.log('hi');
//       const guest = arrClients.find(finder);
//       const inviter = arrClients.find(finderC);
//       const indInviter = arrClients.findIndex(finderC);
//       arrClients[indInviter].private = `${arrClients[indInviter].private}${i}`;
//       arraysPrivate[`${arrClients[indInviter].private}${i}`] = [inviter];
      
//       objMessage.message = `You was invite in private chat. command for join: /p${arrClients[indInviter].private}${i}`;
//       console.log(guest);
//       guest.c.send(JSON.stringify(objMessage));
//     };

//     // if (rJoin.test(dat)) {
//     //   const guest = arrClients.find(finderC);
//     //   const indGuest = arrClients.findIndex(finderC);
//     //   arrClients[indGuest].private = dat.toString().substring(2).trim();
//     //   console.log(arrClients[indGuest].private);
//     //   arraysPrivate[returnRoom()].push(guest);
//     // };




//     if (dat[0] !== '/') {
//       const indUser = arrClients.findIndex(finderC);

//       if (arrClients[indUser].private === null) {
//         const f = arrClients.filter(returnStatus);
//         const filtr = f.filter(notThisUser);
        
//         filtr.forEach((obj) => {
//           obj.c.send(JSON.stringify(objMessage));
//         });
//       }
//       else {
//         const indUser = arrClients.findIndex(finderC);
//         const idOfRoom = arrClients[indUser].private.toString();
//         const room = arraysPrivate[idOfRoom];
//         const filter = room.filter(notThisUser);
//         filter.forEach(c => c.c.send(`private-user-${cPort}: ${data}`));
//       }
//     };
//     // arraysPrivate[i] = arrClients[0];
//     arraysPrivate.count++;
//     // console.log(arraysPrivate)
//   };
// });

// server.onerror = (err) => {
//   throw err;
// };

