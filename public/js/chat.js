const socket = io()


socket.on('message' , (welcomeMsg) =>{
    console.log(welcomeMsg)
})
// socket.on('countUpdated' , (count)=>{
//     console.log('The count had been updated' , count)
// })

// document.querySelector('#btn1').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })