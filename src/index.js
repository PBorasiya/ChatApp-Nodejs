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
const { generateMessage, generateLocationMessage } = require('./utils/messages')


app.use(express.static(publicDirectoryPath))

io.on('connection' , (socket) => {
    console.log('New WebSocket Connection')
    

    socket.emit('message', generateMessage('Welcome'))
    
    socket.broadcast.emit('message',generateMessage('A new user had joined the chat!!'))

    socket.on('sendMessage' , (msg , callback) =>{
        const filter = new Filter()

        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed')
        }
        io.emit('message', generateMessage( msg) )
        callback()
    })

    socket.on('sendLocation' , (location , callback) =>{
        
        if(!location){
            return callback('Please share a valid location')
        }
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${location.latitude},${location.longitude}`) )
        callback()
    })

    socket.on('disconnect' , () =>{
        io.emit('message' , generateMessage('A user has left the chat!!'))
    })
})

server.listen(port, () =>{
    console.log('listening on port ' + port)
})