// import express
const express = require('express');

// import jason web token
const jwt = require('jsonwebtoken');

// import express router
const router = express.Router();

// import methods to render html 
const {renderTemplate, updateTasksCard} = require('../../utils/ui');

// import the todoCard html 
const {todoCard} = require('../../utils/ui');

// import the html for rendering the todoCard in the create task page
const {createTasksCard} = require('../../utils/ui');

// import the configuration 
const config = require('../../config/config');

// Register a route that redirects to login
router.get('/', (req, res) =>{
    return res.redirect('/users/login/page')
})

// register the login page
router.get('/login/page', function(req, res){

    // Create a variable to hold the login html
    const loginHtml = `
        <div class="w-50 mx-auto">
            <form action="/users/login" method="POST">
            <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput">
            <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>

    `
    return res.send(renderTemplate(loginHtml));
});

router.post('/login', function(req, res){
    
    // Extract username and password
    const {username, password} = req.body;
    // Declare a vari able to hold the signed token
    let jwtToken;

    // Check if username and password in the database is the same as the request's username and password
    if(username == config.user.username && password == config.user.password){

        // Declare a variable to hold the payload
        const payload = {
            username: username,
            firstname: 'Jefferson',
            lastname: 'Addai'
        }

        // Sign the jwt and assign to the jwtToken variable
        jwt.sign(payload, config.jwtSecret, (err, token) =>{

            if(err){
                res.status(500).json({
                    code: 'failed',
                    message: 'Internal server error',
                    error: err
                })
            } 

            // If the signing of the token is successful
            else res.json({
                code: "Success",
                message: "Login successful",
                result: {
                    token: token
                }
            });
        })
    }

    // if the username and password don't match return password or username don't match response
    else{
        return res.status(401).json({
            code: "invalid-credentials",
            message: "Invalid username and password",
        })
    }
})

// Export the express router
module.exports = router;