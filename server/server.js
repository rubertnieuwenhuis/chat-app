const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatroom'));
  
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
  
  socket.on('createMessage', (message, callback) =>{
    console.log('createMessage:', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
}); 

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});



