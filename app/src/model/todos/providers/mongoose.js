// import formatDate method from utils
// const {formatDate} = require('../../utils/formatUtils');
const config = require('../../../config/config');

// require mongoose
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: String,
    date: Date,
    type: {
        type: String,
        enum: {
            values: ['study', 'travel', 'cooking'],
            message: '{VALUE} is not supported'
        }
    },
    description: String
});

const Todo = mongoose.model("Todo", todoSchema);

// Create TodoStore class to handle store 
class TodoStore{
    constructor(todos){
        console.log("mongoose loaded!");
    }

    init(){

        // If usefake variable in config is true populate fake data in todoStore
        if(config.usefake){
            
            // Create fake data from the Todo object
            let fakeTodo1 = new Todo(4132, 'Create Site', Date.now(), 'work', 'Create the website');
            let fakeTodo2 = new Todo(3432, 'Wash', Date.now(), 'cooking', 'Wash the utensils');
            
            // Add fake data to todoStore by callig the todoStore addTodo method
            this.addTodo(fakeTodo1);
            this.addTodo(fakeTodo2);

        }
    }

    // Method to get all todos from store
    async getTodos(){

        // Get todos from database
        const result = await Todo.find();
        // convert cursor to array and return
        return result;
    }

    // adds new todo to database
    async addTodo(todo){
        
        // add the todo to the database
        let newTodo = new Todo({
            title: todo.title,
            date: todo.date,
            type: todo.type,
            description: todo.description
        });

        // return the todo
        return newTodo.save();
    }

    // Deletes todo from databse
    async deleteTodo(todo){

        // delete the todo from the database
        return Todo.deleteOne({_id: todo.id});
    }

    async getTodo(todoId){

        // Get todo from database
        return Todo.findById(todoId);
    }

    // Updates a todo object in the database
    async editTodo(id, todo){
                
        // update the todo in the database
        const result = await Todo.replaceOne({
            _id: id
        }, {
            title: todo.title,
            date: todo.date,
            type: todo.type,
            description: todo.description
        });
        
        // return result
        return result;

    }

}



module.exports.TodoStore = TodoStore;
