const express = require('express');
const bodyParser = require('body-parser');

var {mongoose}= require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    console.log('POST REQUEST');
    // get the body sent by client
    console.log('REceived :',req.body.text)
    var todo = new Todo ({
        text:req.body.text
    })
    
    todo.save().then( (doc)=>{ 
        res.send(doc);  // send the saved file in DB back to client
    }, (e)=>{
        res.status(400).send(e);  // send the error 
    } )
    console.log(req.body);
})

app.get('/todos' , (req,res)=>{
    console.log('GET REQUEST');
    Todo.find().then( (todos)=>{
        res.send(todos); 
    }, (e)=>{
        res.status(400).send(e);
    } )
})
app.listen(3000,()=>{
    console.log(`Started on port 3000`);
})
module.exports={app};