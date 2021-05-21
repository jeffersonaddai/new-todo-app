// import formatDate method from utils
const {formatDate} = require('../../utils/formatUtils');

// Create TodoStore class to handle store 
class TodoStore{
    constructor(todos){
        this.todos = [];
    }

    // Method to get all todos from store
    getTodos(){

        // 
        const newTodos = this.todos.slice(0);
        for (const todo of newTodos) {
            todo.date = formatDate(new Date(todo.date))
        }
        return newTodos;
    }

    // adds new todo to database
    addTodo(todo){
        
        // Push todo into storage
        this.todos.push(todo);
    }

    // Deletes todo from databse
    deleteTodo(todo){
        // Get the todo object to be deleted
        let foundTodo = this.getTodo(todo.id);

        // Check if todo was found in storage
        if(foundTodo !== null){

            // Remove todo from storage
            this.todos = this.todos.filter(localTodo => {
                return localTodo != foundTodo;
            })
            return true;
        }else{

            // If todo was not found return false
            return false;
        }

    }

    getTodo(todoId){

        // Loop through the todo database
        for(let localTodo of this.todos){

            // Check if todo id matches the current todo
            if(todoId == localTodo.id){

                // format the date of the matched todo
                localTodo.date = formatDate(new Date(localTodo.date));

                // return the matched todo
                return localTodo;
            }
        }

        // If todo does not match any object return null
        return null;
    }

    // Updates a todo object in the database
    editTodo(id, todo){

        // Declare a variable to hold the found todo that has the id provided in the parameter
        const foundTodo = this.getTodo(id);

        // Check if an object match was found
        if(foundTodo){

            // Update the attributes of the foundTodo with the newTodo object's attributes
            foundTodo.title = todo.title;
            foundTodo.type = todo.type;
            foundTodo.date = todo.date;
            foundTodo.description = todo.description;

            // Return true after updating
            return true;
        }

        // If id does not find any match return false
        return false;

    }

}

class Todo{
    constructor(id, title, date, type, description){
        this.id = id;
        this.title = title;
        this.date = date;
        this.type = type;
        this.description = description;
    }
}


module.exports.TodoStore = TodoStore;
module.exports.Todo = Todo;