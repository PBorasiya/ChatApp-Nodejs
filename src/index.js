const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')


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

    socket.on('sendMessage' , (msg , callback) =>{
        const filter = new Filter()

        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed')
        }
        io.emit('message', msg )
        callback()
    })

    socket.on('sendLocation' , (location , callback) =>{
        
        if(!location){
            return callback('Please share a valid location')
        }
        io.emit('message', `https://google.com/maps?q=${location.latitude},${location.longitude}` )
        callback()
    })

    socket.on('disconnect' , () =>{
        io.emit('message' , 'A user has left the chat!!')
    })
})

server.listen(port, () =>{
    console.log('listening on port ' + port)
})