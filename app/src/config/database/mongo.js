const config = require('../config');
const MongoClient = require('mongodb').MongoClient;

global._mongoDb = null;

if(!config.useMongoose){
    module.exports = function(){
        
        return MongoClient.connect('mongodb://localhost:27017/mydb', 
        { useUnifiedTopology: true }).then((client)=>{
            global._mongoDb = client.db();
        })
        .catch((err)=>{
            console.log('Could not connect to mongodb',err);
            return Promise.reject(err);
        }).then(()=>{
    
        });
    };
}

else{
    const mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/todo", {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on()
}
