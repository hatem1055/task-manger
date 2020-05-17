//modules
const express = require('express'),
      app = express(),
      // the port that the app will run on
      port = process.env.PORT,
      //getting routers
      userRouter = require('./routers/userRouter'),
      taskRouter = require('./routers/taskRouter')
// runing mongoose
require('./db/mongoose')
//parsing json from the response
app.use(express.json())
//using routers
app.use(userRouter)
app.use(taskRouter)
//runing the app
app.listen(port,'192.168.1.21',()=>{
    console.log('server is up on port:' + port)
})

const Task = require("./db/models/task")
const User = require("./db/models/user")
const multer  = require('multer')
const upload = multer({
    dest:'./images/'
})

app.post('/upload',upload.single('image'),(req,res)=>{
    res.send()
})
// main()

