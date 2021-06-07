// import formatDate method from utils
// const {formatDate} = require('../../utils/formatUtils');
const config = require('../../../config/config');

// Create TodoStore class to handle store 
class TodoStore{
    constructor(todos){
        console.log("in-memory todoStore loaded!")
        this.todos = [];
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

        // 
        const newTodos = this.todos.slice(0);

        return newTodos;
    }

    // adds new todo to database
    async addTodo(todo){
        todo.id = Date.now();
        // Push todo into storage
        this.todos.push(todo);
    }

    // Deletes todo from databse
    async deleteTodo(todo){
        // Get the todo object to be deleted
        let foundTodo = await this.getTodo(todo.id);
        // Check if todo was found in storage
        if(foundTodo !== null){

            // Remove todo from storage
            this.todos = this.todos.filter(localTodo => {
                return localTodo.id != foundTodo.id;
            })
            return true;
        }else{

            // If todo was not found return false
            return false;
        }

    }

    async getTodo(todoId){

        // Loop through the todo database
        for(let localTodo of this.todos){

            // Check if todo id matches the current todo
            if(todoId == localTodo.id){


                // return the matched todo
                return localTodo;
            }
        }

        // If todo does not match any object return null
        return null;
    }

    // Updates a todo object in the database
    async editTodo(id, newTodo){

        // Declare a variable to hold the found todo that has the id provided in the parameter
        const tempStore = [];

        for(const todo of this.todos){
            if(id == todo.id){
                tempStore.push(newTodo)
            }else{
                tempStore.push(todo)
            }
        }
        this.todos = tempStore;
        // Check if an object match was found

        // If id does not find any match return false
        return false;

    }

    

}



module.exports.TodoStore = TodoStore;
