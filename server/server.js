const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('new user connected');
  
  socket.emit('newMessage', {
    from: 'me again',
    text: 'hey, there',
    createdAt: 123
  });
  
  socket.on('createMessage', (message) =>{
    console.log('createMessage:', message);
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
}); 

server.listen(port, () => {
  console.log(`Server up on port ${port}`);
});



