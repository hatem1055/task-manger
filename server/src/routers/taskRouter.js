const express = require('express'),
Task = require('../db/models/task'),
auth = require('../middleware/auth'),
taskRouter = new express.Router()

//new task
taskRouter.post('/tasks',auth,async (req,res)=>{
    const newTask = new Task({
        ...req.body,
        owner:req.user._id
    })
    try{
        await newTask.save()
        res.send(newTask)
    }catch(e){
        res.status(400).send(e)
    }
})
//get tasks
taskRouter.get('/tasks',auth,async(req,res)=>{
    const match = {}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed == 'true' ? true : false
    }
    if(req.query.sortBy){
        const sortingParams = req.query.sortBy.split("_")
        sort[sortingParams[0]] = sortingParams[1] == 'desc' ? -1 : 1
    }
    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
})
//get one task
taskRouter.get('/tasks/:id',auth,async (req,res)=>{
    const id = req.params.id
    try{
        task = await Task.findOne({owner:req.user._id,_id:id})
        if(!task){
            res.status(404).send()
        }else res.send(task)
    }catch(e){
        res.status(404).send()
    }
 })
 //update task 
 taskRouter.patch('/tasks/:id',auth,async (req,res)=>{
     const _id = req.params.id,
           allowed = ['desc','completed'],
           updates = Object.keys(req.body),
           isValide = updates.every(e => allowed.includes(e))
    if(!isValide) return res.status(400).send({error:'invalid updates'})

    try{
        const task = await Task.findOne({owner:req.user._id,_id:_id})
        if(!task) res.status(404).send()
        else {
            updates.forEach(u =>task[u] = req.body[u])
            await task.save()
            res.send(task)
        }
    }catch(e){
        res.status(400).send('error')
    }
 })
 //deleting a task
 taskRouter.delete('/tasks/:id',auth,async (req,res)=>{
    const _id = req.params.id
    try{
      const task = await Task.findOneAndDelete({owner:req.user._id,_id:_id})
      if(!task) res.status(404).send()
      else res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = taskRouter 