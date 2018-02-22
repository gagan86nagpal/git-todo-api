const express = require('express');
const bodyParser = require('body-parser');

const _ = require('lodash');
const port  = process.env.PORT||3000;
var {mongoose}= require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');
var app = express();

app.use(bodyParser.json()); // to parse the json from client

app.post('/todos',(req,res)=>{
    console.log('POST REQUEST');
    // creating a new collection
    var todo = new Todo ({
        text:req.body.text
    })
    // saving this collection to database
    todo.save().then( (doc)=>{ 
        res.send(doc);  // send the saved file in DB back to client
    }, (e)=>{
        res.status(400).send(e);  // send the error 
    } )
    console.log(req.body);
})

app.get('/todos' , (req,res)=>{
    console.log('GET REQUEST');
    // Query to fetch all the data from database
    Todo.find().then( (todos)=>{
        res.send(todos);  // send the data back to client (later filter out using authentication)
    } ).catch((e)=>{
        res.status(400).send();
    } )
})

app.get('/todos/:id', (req,res)=>{
    var id = req.params['id'];
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then( (todo)=>{
        if(!todo){
            console.log('Empty todo');
            return res.status(404).send();
        }
         res.send({todo});
    }
 ).catch((e)=>{
        res.status(400).send();
    })
})

app.delete( '/todos/:id', (req,res)=>{
    var id = req.params['id'];
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then( (todo)=>{
        if(!todo){
            console.log('Todo Not FOund');
            return res.status(404).send();
        }
        res.send({todo});
        
    }).catch( (e)=>{
        res.status(400).send();
    } )
} )

app.patch('/todos/:id',(req,res)=>{
    var id = req.params['id'];
    var body =_.pick(req.body, ['text','completed']);
    console.log('body:',body);
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body['completed'] && body['completed'])){
        console.log('COMPLETED');
        body.completedAt = new Date().getTime();
    } else{
        console.log('NOT COMPLETED');
        body.completedAt = null;
        body.completed=false;
    }
    console.log('ALL SET READY TO UPDATE')
    console.log('body:',body);
    Todo.findByIdAndUpdate(id , { $set: body},{new:true}).then( (todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        return res.send({todo});
    }).catch( (e)=>{
        res.status(400).send();
    } )
        
})
app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})
module.exports={app};