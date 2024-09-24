import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import {Event} from "../../types/event";

export default class SocketServer {
    private static instance: SocketServer;
    private io: Server;

    /**
     * Private constructor to enforce singleton pattern
     * @param server - The HTTP server instance
     */
    private constructor(server: HttpServer) {
        this.io = new Server(server);

        // Initialize event handlers
        this.initializeEventHandlers();

        // Singleton setup
        SocketServer.instance = this;
    }

    /**
     * Initialize Socket.IO event handlers
     * @param server - The HTTP server instance
     * @returns {SocketServer}
     */
    public static init(server: HttpServer): SocketServer {
        if (!SocketServer.instance) {
            SocketServer.instance = new SocketServer(server);
        }
        return SocketServer.instance;
    }

    /**
     * Get the singleton instance of SocketServer
     * @returns {SocketServer}
     */
    public static getInstance(): SocketServer {
        if (!SocketServer.instance) {
            throw new Error('SocketServer is not initialized');
        }
        return SocketServer.instance;
    }

    /**
     * Initialize Socket.IO event handlers
     */
    private initializeEventHandlers(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log(`User connected: ${socket.id}`);

            socket.on('disconnect', () => {
                console.log(`User disconnected: ${socket.id}`);
            });
        });
    }

    /**
     * Emit a message to all connected users
     * @param event - The event name
     * @param data - The data to send with the event
     */
    public emitToAll(event: string, data: Event): void {
        this.io.emit(event, data);
    }
}
