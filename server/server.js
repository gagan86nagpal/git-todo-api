const express = require('express');
const bodyParser = require('body-parser');

var {mongoose}= require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    // get the body sent by client
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
app.listen(3000,()=>{
    console.log(`Started on port 3000`);
})