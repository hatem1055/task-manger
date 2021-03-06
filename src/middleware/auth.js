const User = require('../db/models/user')
const jwt = require('jsonwebtoken')
const auth = async (req,res,next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'thisisuser')
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
       if(!user){
           throw new Error()
       }else{
           req.user = user
           req.token = token
           next()
       }
    }catch(e){
        res.status(401).send({error:'please authenticate'})
    }
}

module.exports = auth