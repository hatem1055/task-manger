const mongoose = require('mongoose'),
      validator = require('validator'),
      bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken'),
      Task = require('../models/task')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('unvalid email')
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value) {
            if(value < 0) throw new Error('the age must be more than zero')
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.length < 6) throw new Error('the pass word must be more than 6 chars')
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
}]
},{
    timestamps:true
})
//getting user data
userSchema.virtual("tasks",{
    ref:"task",
    localField:'_id',
    foreignField:'owner'
})
//hiding private data 
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}
//hashing the password before saving the user
userSchema.pre('save',async function (next){
    const user = this
    if(user.isModified('password')){
        const hash = await bcrypt.hash(user.password,8)
        user.password = hash
    }
    next()
})
//generating a token
userSchema.methods.generateToken = async function(){
    const token = jwt.sign({_id:this._id},'thisisuser')
    this.tokens  =  this.tokens.concat({token})
    await this.save()
    return token
}
//login function
userSchema.statics.login = async (email,password)=>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error('cant find user')
    }
    const isMach = await bcrypt.compare(password,user.password)
    if (isMach) {
        return user
    }else{
        throw new Error('unable to login')
    }
}
//deleting user tasks whne the user removing him self 
userSchema.pre('remove',async function(next){
await Task.deleteMany({owner:this._id})
})
//user
const User = mongoose.model('user',userSchema)



module.exports = User