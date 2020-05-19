const mongoose = require('mongoose')
//constant strings
const connectionUrl = "mongodb://127.0.0.1:27017/task-manger-api"

mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    useCreateIndex:true
})



