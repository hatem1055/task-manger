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
//pages
const path = require('path')

app.use(express.static(path.join(__dirname,'../public')))
//runing the app
app.listen(port,'192.168.1.22',()=>{
    console.log('server is up on port:' + port)
})



// main()

