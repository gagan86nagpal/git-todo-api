const express = require('express');
const bodyParser = require('body-parser');

const _ = require('lodash');
const port  = process.env.PORT||3000;
var {mongoose}= require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');
var app = express();
var {authenticate}  = require('./middleware/authenticate');

app.use(bodyParser.json()); // to parse the json from client

app.post('/todos',(req,res)=>{
    console.log('POST REQUEST');
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
app.post('/users', (req,res)=>{
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body);
    user.save().then( ()=>{
        user.generateAuthToken().then( (token)=>{
            res.header('x-auth',token).send(user);
        } )
    } , (e)=>{
        res.status(400).send(e);
    })
})


app.get('/users/me', authenticate,(req,res)=>{
   res.send(req.user);
})
app.post('/users/login', (req,res)=>{
    var body = _.pick(req.body,['email','password']);
    
   // console.log(User.findByToken);
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then( (token)=>{
            res.header('x-auth',token).send(user);
        })
    } ).catch((e)=>{
        res.status(400).send();
    } )

    
})
app.get('/todos' , (req,res)=>{
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
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body['completed'] && body['completed'])){
        body.completedAt = new Date().getTime();
    } else{
        body.completedAt = null;
        body.completed=false;
    }

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