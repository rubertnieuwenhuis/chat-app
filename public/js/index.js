var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
  });

socket.on('disconnect', function() {
  console.log('disconnected to server');
  });

socket.on('newMessage', function(message) {
  console.log('New message', message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  
  $('#messages').append(li);
  });

socket.on('newLocationMessage', function(message) {
  console.log('Location', message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>')
  a.attr('href', message.url);
  li.text(`${message.from}: `);
  li.append(a)
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function(data) {
    console.log(data);
  })
});

var locationButton = $("#send-location");

locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('geolocation not suported by your browser');
  } 
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('unable to fetch location');
  });
});

