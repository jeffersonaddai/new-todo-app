// import express
const express = require('express');

// import express router
const router = express.Router();

// import methods to render html 
const {renderTemplate, updateTasksCard} = require('../../utils/ui');

// import the todoCard html 
const {todoCard} = require('../../utils/ui');

// import the html for rendering the todoCard in the create task page
const {createTasksCard} = require('../../utils/ui');



// import the Todo model
const {Todo} = require('../../model/todos/todo');

// import the configuration 
const config = require('../../config/config');

const {formatDate} = require('../../utils/formatUtils');

// Instantiate a new TodoStore
let todoStore = global._todoStore;



// Register homepage
router.get('/', async (req, res) => {
    
    // Get all todos from model
    let todos = await _todoStore.getTodos();



    if(req.accepts('text/html')){

        // Create a variable to hold html string
        let htmlFrag = '';

        // For each todo found
        for (const todo of todos) {
            htmlFrag += `
            <tr>`
            
            // Print index of each todo
            +`<th scope="row">${todos.indexOf(todo) + 1}</th>`

            // Print todo title
            + `<td>${todo.title}</td>`

            // Print todo date
            + `<td>${formatDate(todo.date)}</td>`

            // Print todo type
            + `<td>${todo.type}</td>`

            // Print todo description
            + `<td>${todo.description}</td>`

            // Render delete button
            + `<td><form action = "/todos/${todo.id}?_method=DELETE" method="POST"><input class="btn btn-danger" type="submit" value="Delete"></form></td>`

            // Render edit button
            + `<td><a href="/todos/update-task/${todo.id}"><button class="btn btn-warning">Edit</button></a></td>
            </tr>       
            `
        }
        
        // Return an html response by calling the rendertemplate method with the html generated
        return res.send(renderTemplate(todoCard(htmlFrag)))
    }
    else{
        // Create a jason object to be returned if the request does not accept html
        let response = {
            code: 'success',
            message: 'request successful',
            result: {
                todos: todos
            }
        }
        // Return a response of the jason object 
        return res.send(response);
    }
})

// Register a route to render the create-task view
router.get('/create-task', async (req, res) => {

    // Return an html response
    res.send(renderTemplate(createTasksCard()));
})

// Register a route to render the update-task view
router.get('/update-task/:id', async (req, res) => {
    
    // Create a todo variable to hold the todo object gotten from the todoStore with the request id
    const todo = await _todoStore.getTodo(req.params.id)
    
    // If todo object was not found return 404
    if(!todo) return res.status(404).end()

    // Otherwise return an html response that is prefilled with the todo objects data
    res.send(renderTemplate(updateTasksCard(
        req.params.id,
        todo.title, 
        formatDate(new Date(todo.date)), 
        todo.type, 
        todo.description))
    );
})

// Register the update route to update a todo
router.put('/:id', async (req, res) =>{

    // Create a new todo object with the request data
    const newTodo = {
        id: req.params.id,
        title: req.body.title,
        date: Date.parse(req.body.date),
        type: req.body.type,
        description: req.body.description
    }

    // Edit the particular todo with the editTodo method
    await _todoStore.editTodo(req.params.id, newTodo);

    // Check if request accepts html
    if(req.accepts('text/html')){
        
        // If request accepts html redirect the request to home
        return res.redirect('/')
    }

    // Otherwise respond with a jason object
    return res.send({
        code: 'success',
        message: 'resource updated successfully',
        result: todoStore.getTodo(req.params.id)
    });
})

// Register a post route to create a new todo
router.post('/', async (req, res) =>{

    let todoId = Date.now();
    
    let todo = new Todo(
        req.body.title, 
        Date.parse(req.body.date),
        req.body.type,
        req.body.description
    )
    await _todoStore.addTodo(todo);

    // Check if the request accepts html
    if(req.accepts('text/html')){

        // if request is made by browser
        return res.redirect('/')
    }else{

        // if request is made by application
        let response = {
            code: "success",
            message: "resource created successfully!",
            result: {
                todo: todoStore.getTodo(todoId)
            }
        }

        // Return the jason object
        return res.send(response);
    }
})

// Register a delete route to delete a todo
router.delete('/:id', async (req, res) =>{

    // Declare a response variable to hold a jason object
    let response;

    // Get the todo id from the request.params
    let todoId = req.params.id;

    // Get the todo object from the todoStore
    let todoObject = await _todoStore.getTodo(todoId);

    // Check if todoObject was found
    if(todoObject != null){

        // if todo object was found delete the todo from the todostore with the deleteTodo method
        await _todoStore.deleteTodo(todoObject);

        // Check if the request accepts html
        if(req.accepts('text/html')){

            // Redirect the request to home if it accepts html
            return res.redirect('/');
        }
        else{

            // Otherwise respond with a jason object
            response = {
                code: 'success',
                message: 'resource deleted successfully',
                result: {
                    todos: _todoStore.getTodos()
                }
            }
            // Return jason object
            return res.send(response);
        }
        
    }
    else {

        // If the resource was not found return a not found jason object
        response = {
            code: 'failed',
            message: 'resource delete failed',
            result: {
                todos: await _todoStore.getTodos(),
            }
        }
        return res.status(404).send(response);
    }
})

// Export the express router
module.exports = router;