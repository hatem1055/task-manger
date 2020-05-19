const mongoose = require('mongoose')
//constant strings
const connectionUrl = process.env.MONGOODB_URL

mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    useCreateIndex:true
})



