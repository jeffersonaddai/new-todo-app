module.exports = {
    renderTemplate: function(blockContent){
        return `

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
                <title>Todo App</title>
            </head>
            <body>
                <div class='container'>
                    <div class='row'>
                        <div class="col-8 mx-auto my-5">
                            <h1 class="text-center">Todo App</h1>
                            ${blockContent}
                        </div>
                    </div>
                    
                </div> 
            </body>
            </html>
        
        `
    },
    todoCard: function(htmlFrag){
        return  `
            <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Control</th>
                <th scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
                ${htmlFrag}
            </tbody>
            </table>
            <a href="/todos/create-task"><button class="btn btn-primary">Add task</button></a>
    
        `
    },
    createTasksCard: function(){
        return `
        <div class="col-12 mx-auto my-2">
            <form action="/todos" method="POST">
                <div class="mb-3">
                <label for="title"  class="form-label">Title</label>
                <input name="title" type="text" class="form-control" id="title">
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Date</label>
                    <input name="date" type="date" class="form-control" id="date">
                </div>
                <div class="mb-3">
                    <select name="type" class="form-select" aria-label="Type">
                        <option selected>Select type</option>
                        <option value="cooking">Cooking</option>
                        <option value="study">Study</option>
                        <option value="travel">Travel</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input name="description" type="text" class="form-control" id="description">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        
        `
    },
    updateTasksCard: function(id, title, date, type, description){
        return `
        <div class="col-12 mx-auto my-2">
            <form action="/todos/${id}?_method=PUT" method="POST">
                <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input name="title" value="${title}" type="text" class="form-control" id="title">
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label">Date</label>
                    <input name="date" value="${date}" type="date" class="form-control" id="date">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Type</label>
                    <select name="type" class="form-select" aria-label="Type">
                        <option ${type == 'cooking' ? 'selected' : '' } value="cooking">Cooking</option>
                        <option ${type == 'study' ? 'selected' : '' } value="study">Study</option>
                        <option ${type == 'travel' ? 'selected' : '' } value="travel">Travel</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input value="${description}"name="description" type="text" class="form-control" id="description">
                </div>
                <input class="btn btn-success" type="submit" value="Save">
            </form>
        </div>
        
        `
    },
    
}