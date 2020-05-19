//modules
const express = require('express'),
//models
      User = require('../db/models/user'),
//the router
     userRouter = new express.Router(),
//middleware
     auth = require('../middleware/auth'),
//email sender
     {welcome,goodbye} = require('../emails/account')
//new user
userRouter.post('/users',async (req,res)=>{
    const newUser = new User(req.body)
        try{
          await newUser.save()
          welcome(newUser.email,newUser.name)
          token = await newUser.generateToken()
          res.send({newUser,token})
           
        }catch(e){
            res.status(400).send(e)
        }
})
//get your profile
userRouter.get('/users/me',auth,async (req,res)=>{
      res.send(req.user)
})
//update a user
userRouter.patch('/users/me',auth,async(req,res)=>{
    const requestUpdates = Object.keys(req.body)
    const allowed = ['name','age','email','password'],
          isValide = requestUpdates.every(update => allowed.includes(update))

    if(!isValide) {
        return res.status(400).send({error:'invalid updates'})
    }
    try{
        const user = req.user
            requestUpdates.forEach(update =>{
                user[update] = req.body[update]
            })
        await user.save()
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})
//deleting user
userRouter.delete('/users/me',auth,async (req,res)=>{
    try{
    goodbye(req.user.email,req.user.name)
    await req.user.remove()
    res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})
//login
userRouter.post('/users/login',async(req,res)=>{
    try{
        const user = await User.login(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send(e) 
    }
})
//logout 
userRouter.post('/users/logout',auth,async(req,res)=>{
    try{
        const user = req.user,
              token = req.token
        user.tokens = user.tokens.filter(e => e.token != token)
       await user.save()
       res.send()
    }catch(e){
        res.status(400)
    }
})
userRouter.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        const user = req.user
        user.tokens = []
       await user.save()
       res.send()
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports = userRouter