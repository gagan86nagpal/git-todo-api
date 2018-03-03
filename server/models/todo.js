var mongoose = require('mongoose');
var Todo  = mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completedAt:{
        type:Number,
        default:null
    },
    completed:{
        type:Boolean,
        default: false
    },
    _creator:{
        required:true,
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports ={Todo};