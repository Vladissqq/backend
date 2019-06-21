const mongoose = require('mongoose');
const Room = require('./models/Room');
const Message = require('./models/Message');
const User = require('./models/User');
// const cors = require('cors');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const port = 8124;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:true}) );
app.use( cors() );
// app.use(cors());

io.origins('*:*');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const db = mongoose.connection;
// mongoose.set('debug', true); 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('ok')
});

const room = new Room({
  _id: new mongoose.Types.ObjectId(),
  name: 'all',
  messages: []
});

room.save((err) => {
  if (err) throw err;
})


const arrId = [];
const arrClients = [];
const rooms = ['all'];
let decoded = null;

app.post('/auth', function (req, res) {
  decoded = jwt.decode(req.body.tokken);
  console.log(decoded);
  res.status(200).send('auth correct');
});

app.get('/get_info', function (req, res) {

  res.status(200).send(decoded);
})

io.on('connection', (client) => {

  client.join('all');
  arrId.push(client.id);
  arrClients.push(client);
  client.emit('send online', arrId);
  console.log('client connected');
  console.log(arrId.length);


  client.on('disconnect', () => {
    console.log('client disconnect');
    const index = arrId.findIndex((id) => {
      return id === client.id;
    });
    arrId.splice(index, 1);
    arrClients.splice(index, 1);
    client.emit('send online', arrId);
  });

  client.on('output message', (message) => {
    Room.findOne({ name: message.room }).exec(
      (err, room) => {
        const messages = room.messages;
        messages.push(message);
        room.messages = messages;
        room.save();
      }
    );
    client.broadcast.to(message.room).emit('input room', message);
  });
  client.on('create', (roomObj) => {

    const customRoom = new Room({
      _id: new mongoose.Types.ObjectId(),
      name: roomObj.room,
      messages: []
    });

    customRoom.save();

    rooms.push(roomObj.room);
    const guestInd = arrClients.findIndex((client) => {
      return client.id === roomObj.guest
    });
    const message = {
      message: `user_id:${client.id} invited you to ${roomObj.room} `
    }
    arrClients[guestInd].emit('invite', message);
    client.join(roomObj.room);
  });

  client.on('leave room', (room) => {
    client.leave(room);
    client.emit('server message', 'you left the room');
  })
});


http.listen(port, () => {
  console.log('SERVER started on port number: '+port);
});


