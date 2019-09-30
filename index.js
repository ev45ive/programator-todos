
class Todos {
    constructor(url) {
        this.todosList = $(".todos");
        this.url = url;


        this.renderTodos();

        this.todosList.on("click", ".todo_title", e => {

            let todo = e.target,
                id = todo.dataset.id,
                state = (todo.dataset.done == "true") ? false : true;  

            
            this.changeTodo(id, state);

            this.todosList.empty();
            this.renderTodos();

        })

    }

    getTodos() {
        
        let xhr = new XMLHttpRequest();
        
            xhr.open("GET", this.url);
        
            let p = new Promise(function(resolve, reject) {
        
                xhr.onload = function() {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject( new Error("Wystąpił błąd") );
                    }
                };
        
                xhr.onerror = function() {
                    reject( new Error("Wystapił błąd") );
                };
        
            });
        
            xhr.send();
        
            return p;
        
        }


    async renderTodos() {

        let json = await this.getTodos();
        
        json.forEach(el => {
            
            el.done ? this.todosList.append(this.renderTodo(el)) : this.todosList.prepend(this.renderTodo(el))
            
        });

        
}
    renderTodo(el) {

        let todo = `<div class="todo"> 
                    <div class="todo_title ${el.done ? "done" : ""}" data-id="${el.id}" data-done="${el.done}">
                     ${el.title} ${el.done ? `<div class="done_text">zrobione!</p>` : ""} </div>
                    <div class="todo_desc ${el.done ? "hidden" : ""}"> ${el.desc} </div></div> `;
        return todo
    }

    changeTodo(id, state) {

        let data = {"done": state},
            xhr = new XMLHttpRequest();
        
        xhr.open("PATCH", `${this.url}/${id}`);

        xhr.setRequestHeader("Content-type", "application/json")
    
        xhr.send(JSON.stringify(data));

    }

    deleteTodo(id) {
// DELETE
        // usuwanie todo po klikniętym id
    }

    newTodo(data) {
// POST
        // tworzenie nowego todo, wysyłanie na serwer

    }

}

const todos = new Todos("http://localhost:3000/todos");
