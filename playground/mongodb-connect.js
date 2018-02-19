const {MongoClient,ObjectID}  = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log('Unable to connect to MongoDB server');
        return;
    }
    var db = client.db('TodoApp');
 /*   console.log('Connected to MongoDB server');
    console.log(db);
    db.collection('Todos').insertOne({
        text:'Something to do',
        completed: false
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert TOdo',err);
        }
        console.log(JSON.stringify(result.ops,undefined,3));
    });*/
//    console.log('Connected to MongoDB server');
//    db.collection('Users').insertOne({
//        name:'Gagndeep Nagpal',
//        age: 21,
//        location:'New Delhi'
//    },(err,result)=>{
//        if(err){
//            return console.log('Unable to insert User',err);
//        }
//        console.log(JSON.stringify(result.ops,undefined,3));
//    })
//    
    client.close();
})