const mongoose = require('mongoose')
//constant strings
const connectionUrl = "mongodb+srv://hatem1055:hatemmostafa10@cluster0-zb1c8.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    useCreateIndex:true
})



