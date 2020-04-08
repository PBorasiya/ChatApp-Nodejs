const socket = io()


socket.on('message' , (welcomeMsg) =>{
    console.log(welcomeMsg)
})


document.querySelector('#msgForm').addEventListener('submit' ,(e) =>{
    e.preventDefault()
    const msg = document.querySelector('input').value
    socket.emit('sendMessage',msg)
})

