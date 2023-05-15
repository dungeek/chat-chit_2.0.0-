
import { Server } from 'socket.io';

export default function socketServices (httpServer: any) {
    const io = new Server(httpServer);
    console.log('rwe');
    io.on("connection", (socket) => {
        console.log('OKKKK');
      });
};
