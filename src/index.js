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

io.on('connection' , (socket) => {
    console.log('New WebSocket Connection')
    const welcomeMsg = 'Welcome Pranav'

    socket.emit('message', welcomeMsg)
    // socket.emit('countUpdated',count)
    // socket.on('increment' , () =>{
    //     count++
    //     //socket.emit('countUpdated', count)
    //     io.emit('countUpdated',count)
    // })
})

server.listen(port, () =>{
    console.log('listening on port ' + port)
})