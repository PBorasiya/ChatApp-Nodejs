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
const { addUser, getUser, getUsersInRoom, removeUser} = require('./utils/users')

app.use(express.static(publicDirectoryPath))

io.on('connection' , (socket) => {
    console.log('New WebSocket Connection')
    socket.on('join' , ({username,room} , callback ) => {
        const {error, user } = addUser({ id: socket.id , username , room })

        if(error){
            return callback(error)
        }

        socket.join(user.room)
        
        socket.emit('message', generateMessage(`Welcome ${username}`))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} had joined the chat!`))

        callback()

    })

    socket.on('sendMessage' , (msg , callback) =>{
        const user =  getUser(socket.id)

        const filter = new Filter()

        if(filter.isProfane(msg)){
            return callback('Profanity is not allowed')
        }
        io.to(user.room).emit('message', generateMessage( user.username,msg) )
        callback()
    })

    socket.on('sendLocation' , (location , callback) =>{
        const user =  getUser(socket.id)
        if(!location){
            return callback('Please share a valid location')
        }
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,`https://google.com/maps?q=${location.latitude},${location.longitude}`) )
        callback()
    })

    socket.on('disconnect' , () =>{
        const user  = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message' , generateMessage('Admin' ,`${user.username} has left the chat!!`))
        }
        
    })
})



server.listen(port, () =>{
    console.log('listening on port ' + port)
})