const {MongoClient,ObjectID}  = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log('Unable to connect to MongoDB server');
        return;
    }
    var db = client.db('TodoApp');
//    db.collection('Todos').find({completed:false}).toArray().then( (docs)=>{
//        console.log(docs);
//        // console.log(JSON.stringify(docs,undefined,2));
//    },(err)=>{
//        console.log('Unable to fetch Todos',err);
//    } )  
//    db.collection('Todos').find().count().then( (count)=>{
//        console.log(`Todos count ${count}`);
//    },(err)=>{
//        console.log('Error occured in fetching data',err);
//    })
    db.collection('Users').find({name:'Gagndeep'}).toArray().then( (docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Error in Fetching data',err);
    }  )
//    client.close();
})