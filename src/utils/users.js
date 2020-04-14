const users = []

const addUser = ({ id, username, room }) => {
    //cleaning the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate the data
    if(!username  || !room){
        return{
            error : 'Username and room is required'
        }
    }

    //check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //validate username
    if(existingUser){
        return{
            error : 'Username is taken!'
        }
    }

    //store user
    const user = { id, username, room}
    users.push(user)

    return { user }

}

const removeUser = ((id) => {
    const index = users.findIndex((user)=>  user.id === id)

    if(index !== -1){
        return users.splice(index,1)[0]
    }
})

const getUser = ((id) =>{
    return users.find((user) => user.id === id)
})

const getUsersInRoom = ((room) => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
   
})

addUser({
    id : 7,
    username : 'Pranav',
    room :'Milpitas'
})

addUser({
    id : 8,
    username : 'Neel',
    room :'Milpitas'
})

addUser({
    id : 15,
    username : 'Vaibhav',
    room :'Fremont'
})

console.log(users)

console.log(getUser(7))
console.log(getUsersInRoom('Milpitas'))


