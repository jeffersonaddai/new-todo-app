// Require the config file
const config = require('../config');

// Require mongodb client
const MongoClient = require('mongodb').MongoClient;

// Set a global variable to hold the database instance
global._mongoDb = null;


module.exports = function(){   
    return MongoClient.connect(config.mongodbUrl, 
        { useUnifiedTopology: true }).then((client)=>{
            _mongoDb = client.db();
        })
        .catch((err)=>{
            console.log('Could not connect to mongodb', err);
            return Promise.reject(err);
        }).then(()=>{

        });
};


