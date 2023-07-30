import { Server } from "socket.io";
import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
    "message from server": (text: string, self: boolean) => void;
}

export interface ClientToServerEvents {
    "message to server": (text: string) => void;
}

export type ServerSocket = Server<ClientToServerEvents, ServerToClientEvents>;
export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
