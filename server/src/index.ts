import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import {
    ClientToServerEvents,
    ServerSocket,
    ServerToClientEvents,
} from "../shared/types";

const app = express();
const server = http.createServer(app);
const io: ServerSocket = new Server(server, { cors: { origin: "*" } });
const port = 3000;

type Client = Socket<ClientToServerEvents, ServerToClientEvents>;
const clients: Map<string, Client> = new Map();

/**
 * Broadcasts a message to all clients.
 * @param {Client} socket - The socket that sent the message.
 * @param {string} text - The message to broadcast.
 */
function broadcastMessage(socket: Client, text: string) {
    clients.forEach((client) => {
        if (client.id === socket.id) {
            client.emit("message from server", text, true);
        } else {
            client.emit("message from server", text, false);
        }
    });
}

io.on("connection", (socket) => {
    clients.set(socket.id, socket);

    socket.on("message to server", (text) => {
        broadcastMessage(socket, text);
    });

    socket.on("disconnect", () => {
        clients.delete(socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
