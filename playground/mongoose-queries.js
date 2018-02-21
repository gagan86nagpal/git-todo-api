
const {Todo}  = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const mongoose = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
var id = "5a8b1b6ed49b1831d0f4e7e4";

if(!ObjectID.isValid(id)){
    console.log('Id is not valid');
}

//User.findById(id).then( (user)=>{
//    if(!user){
//        return console.log('User not found');
//    }
//    console.log(user);
//} ).catch((e)=>console.log(e) );
//Todo.find({
//    _id:id
//}).then( (todos)=>{
//    if(!todos){
//        return console.log('todos not found');
//    }
//    console.log('Todos Found',todos);
//} ).catch((e)=>console.log(e));

//Todo.findOne({
//    _id:id
//}).then( (todo)=>{
//    if(!todo){
//        return console.log('todo not found');
//    }
//    console.log('Todo Found',todo);
//} ).catch( (e)=>console.log(e) );
//
Todo.findById(id).then( (todo)=>{
    if(!todo){
       return  console.log('Todo not found');
    }
    console.log('Todo by ID found',todo);
} ).catch( (e)=>console.log(e) );