
const {Todo}  = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const mongoose = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
var id = "5a8b1b6ed49b1831d0f4e7e4";


Todo.findByIdAndRemove("5a8b1b6ed49b1831d0f4e7e4").then( (todo)=>{
    console.log(todo);
} )

Todo.findOneAndRemove({ _id:"5a8b1b6ed49b1831d0f4e7e4" }).then( (todo)=>{
    console.log(todo);
} )