
import { createServer } from 'http';
import staticHandler from 'serve-handler';
import ws, { WebSocketServer } from 'ws';
//serve static folder
const server = createServer((req, res) => {   // (1)
    return staticHandler(req, res, { public: 'public' })
});
const wss = new WebSocketServer({ server }) // (2)
wss.on('connection', (client) => {
    console.log('Client connected !')
    client.on('message', (msg) => {    // (3)
        console.log(`Message:${msg}`);
        broadcast(msg)
        // broadcast(msg)
    })
    // socket.on('disconnect', () => {
    //     console.log('User disconnected');
    // });
})
function broadcast(msg) {       // (4)
    for (const client of wss.clients) {
        if (client.readyState === ws.OPEN) {
            client.send(msg)
        }
    //       socket.on('disconnect', () => {
    //     console.log('User disconnected');
    // });
    }
}
server.listen(process.argv[2] || 8081, () => {
    console.log(`server listening...`);
})