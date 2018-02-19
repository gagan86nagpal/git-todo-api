const {MongoClient,ObjectID}  = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log('Unable to connect to MongoDB server');
        return;
    }
    var db = client.db('TodoApp');
//    db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
//        console.log(result);
//    })
//        db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
//        console.log(result);
//    })
//        db.collection('Todos').findOneAndDelete({text:'Eat Lunch'}).then( (result)=>{
//        console.log(result);
//        })
//            db.collection('Users').deleteMany({name:'Gagndeep'}).then( (result)=>{
//                console.log(result);
//            } )
        db.collection('Users').deleteOne({_id:new ObjectID('5a8a4a5258d4ee162c7b365e')}).then( (result)=>{
            console.log(result);
        } )
//    client.close();
})