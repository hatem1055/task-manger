const mongoose = require('mongoose'),
      validator = require('validator')
// task
const taskSchema = mongoose.Schema({
    desc:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    }
},{
    timestamps:true
}
)
const Task = mongoose.model('task',taskSchema)
 
module.exports = Task