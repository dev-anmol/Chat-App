const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

//Socket.io
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('user-message', message =>
        io.emit('message', message)
    );
});

//for http express will handle it
app.use(express.static(path.resolve('./public/index.html')));

app.get('/', (req, res) => {
    return res.sendFile(path.resolve('./public/index.html'))
})


server.listen(9000, () => console.log('server started at PORT 9000'))