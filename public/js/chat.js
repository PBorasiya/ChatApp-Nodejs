const socket = io()
const $msgForm = document.querySelector('#msgForm')
const $messageFormInput = $msgForm.querySelector('input')
const $msgFormButton = $msgForm.querySelector('button')

socket.on('message' , (welcomeMsg) =>{
    console.log(welcomeMsg)
})


$msgForm.addEventListener('submit' ,(e) =>{
    e.preventDefault()

    //disabling form button while it is passing the msg to prevent duplicate data in transaction
    $msgFormButton.setAttribute('disabled','disabled')

    const msg = e.target.elements.msg.value
    socket.emit('sendMessage',msg, (error) => {
        //enabling form button again for next data
        $msgFormButton.removeAttribute('disabled')

        //clearing the value of input box once the message is sent
        $messageFormInput.value = ''
        $messageFormInput.focus()
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
        }, (error) =>{
            if(error){
                return console.log(error)
            }

            console.log('location shared!')
        })
    })
})
