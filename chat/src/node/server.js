// const Websocket = require('ws');
const io = require('socket.io')();
io.origins('*:*');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('ok')
});

var kittySchema = new mongoose.Schema({
  name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});
// const arrId = [];
// const arrClients = [];
// const rooms = ['all'];

// io.on('connection', (client) => {
//   client.join('all');
//   arrId.push(client.id);
//   arrClients.push(client);
//   client.emit('send online',arrId);
//   console.log('client connected');
//   console.log(arrId.length);
  

//   client.on('disconnect',() =>{
//     console.log('client disconnect');
//     const index = arrId.findIndex((id) =>{
//       return id === client.id;
//     });
//     arrId.splice(index,1);
//     arrClients.splice(index,1);
//     client.emit('send online',arrId);
//   });

//   client.on('output message',(message) => {
//       client.broadcast.to(message.room).emit('input room',message);
//   });
//   client.on('create',(roomObj)=>{
//     rooms.push(roomObj.room);
//     const guestInd = arrClients.findIndex((client) => {
//       return client.id === roomObj.guest
//     });
//     const message = {
//       message: `user_id:${client.id} invited you to ${roomObj.room} `
//     }
//     arrClients[guestInd].emit('invite', message);
//     client.join(roomObj.room);
//   });
  
//   client.on('leave room',(room) =>{
//     client.leave(room);
//     client.emit('server message','you left the room');
//   })
// });


// const port = 8124;
// io.listen(port);
// console.log('listening on port ', port);

