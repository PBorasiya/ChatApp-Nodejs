const socket = io()
const $msgForm = document.querySelector('#msgForm')
const $messageFormInput = $msgForm.querySelector('input')
const $msgFormButton = $msgForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')


//Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#locationMessage-template').innerHTML

socket.on('message' , (message) =>{
    
    const html = Mustache.render($messageTemplate , {
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm A')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessage' , (message) => {
    const html = Mustache.render($locationTemplate , {
        url : message.url,
        createdAt : moment(message.createdAt).format('h:mm A')
    })
    $messages.insertAdjacentHTML('beforeend',html)
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
    //disabled the button so we don't allow users to be able to send duplicate copies while the 1st copy is 
    //still sending
    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('sendLocation', {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude,
            timestamp : position.timestamp
        }, () =>{
            console.log('location shared!')
            //disabled the button so we can allow users to send location once the earlier transaction is done
            $locationButton.removeAttribute('disabled')
        })
    })
})
