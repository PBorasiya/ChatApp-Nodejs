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
    

    socket.emit('message', 'Welcome Pranav')
    
    socket.broadcast.emit('message','A new user had joined the chat!!')

    socket.on('sendMessage' , (msg) =>{
        io.emit('message', msg )
    })

    socket.on('sendLocation' , (location) =>{
        
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}` )
    })

    socket.on('disconnect' , () =>{
        io.emit('message' , 'A user has left the chat!!')
    })
})

server.listen(port, () =>{
    console.log('listening on port ' + port)
})