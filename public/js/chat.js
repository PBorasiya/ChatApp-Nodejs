const socket = io()


socket.on('message' , (welcomeMsg) =>{
    console.log(welcomeMsg)
})


document.querySelector('#msgForm').addEventListener('submit' ,(e) =>{
    e.preventDefault()
    const msg = e.target.elements.msg.value
    socket.emit('sendMessage',msg, (error) => {
        if(error){
            return console.log(error)
        }
        console.log('message delievered!!')
    })
})
 

document.querySelector('#send-location').addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser')
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
            timestamp : position.timestamp
        })
    })
})
