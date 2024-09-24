import {io, Socket} from "socket.io-client";
import {Event} from "../../types/event";

class SocketClient {
    static instance: SocketClient;
    private socket: Socket = {} as Socket;

    constructor() {
        if (SocketClient.instance) {
            return SocketClient.instance;
        }

        const socketURL = import.meta.env.VITE_SOCKET_URL || window.location.origin;

        this.socket = io(socketURL, {
            transports: ['websocket']
        });

        this.socket.on('connect', () => {
            console.log('Connecté au serveur Socket.IO');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Erreur de connexion Socket.IO:', error);
        });

        SocketClient.instance = this;
    }

    // Listen event from server in client
    on(event: string, callback: (data: Event) => void) {
        this.socket.on(event, callback);
    }

    // Listen event from server in client
    off(event: string) {
        this.socket.off(event);
    }
}

// Export only one instance of socket
const socket = new SocketClient();
export default socket;
