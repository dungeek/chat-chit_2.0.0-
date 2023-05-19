import { type } from 'os';
import { Server, Socket } from 'socket.io';
import databaseUsers from '../../databaseUsers.json';

// type User = {
//     username: string;
//     password: string;
// };

type Message = {
    message: string;
    destination: string;
};

const connectedUsers: Socket[] = [];

export default function socketServices(httpServer: any , username: string) {
    console.log('running');
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        console.log('Connection');
        socket.data.username = username;
        connectedUsers.push(socket);
        handleSocketConnection(socket);
    });

    //SHELL handling real-time chat
    function handleSocketConnection(clientSocket: Socket) {
        clientSocket.emit('connected', { id: clientSocket.id });

        // clientSocket.on('authenticating-user', (data: User) => {
        //     handleSocketAuthenticate(clientSocket, data);
        // });
        clientSocket.on('send-message', (data: Message) =>{
            handleSocketSendMessage(clientSocket, data);
        }
        );

        clientSocket.on('disconnected', (_: any) =>
            handleSocketDisconnetion(clientSocket),
        );
    }

    // //FUNCTION layer 1
    // function handleSocketAuthenticate(socket: Socket, data: User) {
    //     const { username, password } = data;

    //     // check if a user with the specific username and password existing in database
    //     const validatedUser = validateUsernameAndPassword(username, password);

    //     if (validatedUser) {
    //         socket.data.username = username; // Assign Nick-name used by authenticated user in the chatting platform
    //         socket.emit('authenticated-user', {});
    //         console.log(`${username} joined ${socket.id}`);

    //         //If anyone access with an existing username in the chatting, force the existing user to disconnect and inform it
    //         //Validate in connectedUser
    //         forceUserToDisconnect(username, 'already joined somewhere ');
    //         connectedUsers.push(socket);
    //         setTimeout(
    //             () => forceUserToDisconnect(username, 'timeout'),
    //             696969,data
    //         );
    //     }
    // }

    // //Function layer 2
    // function validateUsernameAndPassword(username: string, password: string) {
    //     const matched = databaseUsers.some((user) => {
    //         return user.username === username && user.password === password;
    //     });
    //     return matched;
    // }

    //Function layer 2
    function forceUserToDisconnect(username: string, reason: string) {
        const index = connectedUsers.findIndex(
            (element) => element.data.username === username,
        );
        //If there is an user posssessing identical username with username inputing from client
        if (index !== -1) {
            const identicalUser = connectedUsers[index];
            identicalUser.emit('force-disconnect', reason);
            connectedUsers.splice(index, 1);
        }
    }

    //FUNCTION layer 1
    function handleSocketSendMessage(socket: Socket, data: Message) {
        const { message, destination } = data;
        const sender = socket.data.username;
        let receiver = '' as string;

        //Check wether destination in connectUsers or not, if not, switch to all
        connectedUsers.forEach((sk) => {
            sk.data.username === destination ? receiver ='all' : receiver = destination;
        });

        connectedUsers.forEach((sk) => {
            sk?.emit('receive-message', {
                sendAt: Date.now(),
                sender: sender,
                receiver: receiver,
                message: message,
            });
        });
    }

    //FUNCTION layer 1
    function handleSocketDisconnetion(socket: Socket) {
        console.log(`${socket.data.username} left ${socket.id}`);
    }
}
