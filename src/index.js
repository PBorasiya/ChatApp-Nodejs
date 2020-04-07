const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

const app = express()

app.use(express.static(publicDirectoryPath))

app.listen(port, () =>{
    console.log('listening on port ' + port)
})