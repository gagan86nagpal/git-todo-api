const {MongoClient,ObjectID}  = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        console.log('Unable to connect to MongoDB server');
        return;
    }
    var db = client.db('TodoApp');
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5a8a496c58d4ee162c7b365c')
//    },{
//        $set:{
//            completed:true
//        }
//    },{
//        returnOriginal:false
//    }).then( (result)=>{
//        console.log(result)
//    })
    db.collection('Users').findOneAndUpdate( { _id:new ObjectID('5a8a4e7c58d4ee162c7b365f')},{
        $set:{name:'Gagandeep'},
        $inc:{age:-1}
    },{
        returnOrginal:false
    }).then((result)=>{
        console.log(result);
    })
//    client.close();
})