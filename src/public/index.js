console.log('io:', io);

// Connect to the socket.io server
const socket = io('http://localhost:4000');

// Listen for the 'connect' event
socket.on('connect', () => {
  console.log('Connected to the server');
});

// Listen for the 'disconnect' event
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
