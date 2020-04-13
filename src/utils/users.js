const users = []

const addUser = ({ id, username, room }) => {
    //cleaning the data
    username = username.trim().toLowerCase()
    room = roon.trim().toLowerCase()

    //validate the data
    if(!username  || !room){
        return{
            error : 'Username and room is required'
        }
    }

    //check for existing user
    const existingUser = user.find((user) => {
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