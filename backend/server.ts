import express from 'express';
import {createServer} from 'http';
import path from 'path';
import router from './router';
import SocketServer from './lib/socket'

// Init http server
const app = express();
const {PORT} = process.env;
const server = createServer(app);
const __dirname = path.resolve();

// Init socket
const socket = SocketServer.init(server);

// Middleware to parse JSON requests
app.use(express.json());

// Serve API requests from the router
app.use('/api', router);

// Serve static files from the frontend build directory (Vite output)
app.use(express.static(path.join(__dirname, 'dist')));

// Handle client routing, return all requests to the app frontend
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

server.listen(PORT, () => {
    // Simulate a delay of 5 seconds
    setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100);
        console.log(`Sending event ${randomNumber}`);
        // Send event to socket
        socket.emitToAll('event', {
            name: `Event ${randomNumber}`,
            id: randomNumber
        });
    }, 5000);

    console.log(`Server is running on port ${PORT}`);
});