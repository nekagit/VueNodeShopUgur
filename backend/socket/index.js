const { Server: SocketIOServer, Socket } = require('socket.io');

let io;
let currentSocket;

const init = function (server) {
    io = new SocketIOServer(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('a user connected');

        currentSocket = socket;

        socket.on('ping', () => {
            socket.emit("pong", new Date().toLocaleTimeString());
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

function getIO() {
    return io;
}

function getSocket() {
    return currentSocket;
}

module.exports = {
    init,
    getIO,
    getSocket
};