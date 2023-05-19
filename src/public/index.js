// Connect to the socket.io server

// const router = require("../routers/web");

//this socket means clientSocket in server, it emits event
const socket = io();
const message = document.getElementById('message');
const receiver = document.getElementById('receiver');
const send_button = document.getElementById('send-button');
// Listen for the default 'connect' event
socket.on('connected', () => {
    //onSocketConnection(socket);
    console.log('connected');
    onSocketChat(socket);
});

function navigate(url = '') {
    window.location.href = url;
}

//After authenticating Users phase then authenticate receiver to send message and display messages
function onSocketChat(socket) {
    send_button.onclick = () => {
        if (message.value!== '' && receiver.value !== '') {
            console.log('valid message');
            socket.emit('send-message', {
                message: message.value,
                destination: receiver.value,
            });
        }
    };
    const exit = document.getElementById('exit');
    socket.on('receive-message', (data) => onSocketReceiveMessage(data));
    exit.onclick = () => {
        navigate('/');
    };
}

function permitSocketToSendMessage(socket) {
    send_button.onclick = () => {
        console.log(message, receiver);
        if (message!== '' && receiver !== '') {
            console.log('valid message');
            socket.emit('send-message', {
                message: message,
                destination: receiver,
            });
        }
    };
}

function onSocketReceiveMessage(data) {
    const { sendAt, sender, receiver, message } = data;
    const element = document.createElement('div');
    element.innerText = `${new Date(
        sendAt,
    ).toJSON()} ${sender} to ${receiver} : ${message}`;
    document.getElementById('inbox').appendChild(element);
}

// Listen for the default 'disconnect' event
socket.on('disconnected', () => {
    alert('Disconnected from the server');
    navigate('/');
});

// socket.on('authenticated-user', (_) => {
//     onSocketChat(socket);
//     navigate('/gossip');
// });

socket.on('force-disconnect', (data) =>
    onSocketForceDisconnet(socket, (data = {})),
);
//When failing in authenticating phase
function onSocketForceDisconnet(socket, data = {}) {
    const { reason } = data;
    alert(`Another ${socket.username} ${reason}, please connect again!!!`);
    navigate('/');
}

//Socket Connection phase
// function onSocketConnection(socket) {
//     //Accumulate data to initialize authenticating phase
//     const username = document.getElementById('username');
//     const password = document.getElementById('password');
//     const join = document.getElementById('join-button');
//     console.log(join);

//     join.onclick = () => {
//         console.log(socket);
//         socket.emit('authenticating-user', {
//             username: username.value,
//             password: password.value,
//         });
//         console.log('clicked');
//     };
// }
