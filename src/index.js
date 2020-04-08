const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

const app = express()
const server = http.createServer(app)
const io = socketio(server)



app.use(express.static(publicDirectoryPath))

io.on('connection' , () => {
    console.log('New WebSocket Connection')
})

server.listen(port, () =>{
    console.log('listening on port ' + port)
})