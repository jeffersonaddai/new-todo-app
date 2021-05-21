// import express
const express = require('express');

const mongoLoader = require('./app/src/config/database/mongo');

// Import jwt

const jwt = require('jsonwebtoken');

// create an express app
const app = express();

// import route from controllers
const indexRoute = require('./app/src/controllers/todo/todo');
const usersRoute = require('./app/src/controllers/users/users')

const config = require('./app/src/config/config')

// set up methodoverride middle to support PUT and DELETE methods in html forms
const methodOverride = require('method-override');

// register express jason middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// register method override middleware to support PUT and DELETE methods in html forms
app.use(methodOverride('_method'));

// register a middleware to verify if a user is logged in for non-get requests
app.use(function(req, res, next){


    // If a client that expects html probably a browser, don't authenticate
    if(req.accepts('text/html') || req.url.startsWith('/users/login')){
        next();
        return;
    }

    // Else Authenticate
    const authString = req.headers['authorization'];
    if(!authString){
        res.status(400).json({
            code: 'jwt-notfound',
            message: "Jwt not found!"
        })
        return ;
    }
    const parts = authString.split(" ");
    const token = parts[1];
    jwt.verify(token, config.jwtSecret, function(err, payload){

        if(err){
            res.status(401).json({
                code: 'authentication-failed',
                message: 'An error occured',
                error: err
            })
        } 
        else next();
    })
});

// Register home route
app.get('', (req, res) =>{

    // redirect request to /todos
    return res.redirect('/todos')
})



// Register /todos route with imported router
app.use('/todos', indexRoute)

// register/users route
app.use('/users', usersRoute);

mongoLoader().then(()=>{
    app.listen(3000, ()=>{
        console.log('Mongodb loaded and Server running on port 3000!')
    });
}).catch(()=>{
    console.log('Could not start server because mongo failed to load');
});


