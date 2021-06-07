// Require mongoose module
const mongoose = require("mongoose");

// Require configuration file
const config = require("../config");




// Connect mongoose to database

module.exports = function(){
    // Register an event to listen to errors
    mongoose.connection.once("error", function(err){
        console.error(err);
    });
    return mongoose.connect(config.mongodbUrl , {useNewUrlParser: true, useUnifiedTopology: true})
        .then(console.log("Mongoose connected to database"));
}