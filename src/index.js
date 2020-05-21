const app = require('./app'),
// the port that the app will run on
      port = process.env.PORT || 3000
//runing the app
app.listen(port,()=>{
    console.log('server is up on port:' + port)
})





