// import formatDate method from utils
// const {formatDate} = require('../../utils/formatUtils');
const config = require('../../../config/config');
const ObjectId = require('mongodb').ObjectId;
// Create TodoStore class to handle store 
class TodoStore{
    constructor(todos){
        console.log("Mongo db client loaded!");
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
        const cursor = _mongoDb.collection("todos").find();

        // convert cursor to array
        const todos = await cursor.toArray();
        
        // loop through todos and assign the values of _id to id
        for(const todo of todos){
            todo.id = todo._id;
        }
        return todos; 
    }

    // adds new todo to database
    async addTodo(todo){
        
        // add the todo to the database
        const result = await _mongoDb.collection("todos").insertOne({
            title: todo.title,
            date: todo.date,
            type: todo.type,
            description: todo.description
        });
        result.id = result._id;
        // return result
        return result;
    }

    // Deletes todo from databse
    async deleteTodo(todo){

        // delete the todo from the database
        const result = await _mongoDb.collection("todos").deleteOne({_id: ObjectId(todo.id)});

        // return result
        return result;

    }

    async getTodo(todoId){
        // Get todo from database
        const result = await _mongoDb.collection("todos").findOne({_id: ObjectId(todoId)});
        if(result){
            result.id = result._id;
        }


        // return the result
        return result;
    }

    // Updates a todo object in the database
    async editTodo(id, todo){
                
        // update the todo in the database
        const result = await _mongoDb.collection("todos").replaceOne({
            _id: ObjectId(id)
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
