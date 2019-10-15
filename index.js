import {xhr} from "./xhr.js";

class Todos {
    constructor(url) {
        this.todosList = $(".todos");
        this.url = url;
        this.form = $("#new_todo");
        this.newTitle = $(".new_todo_title");
        this.newDesc = $(".new_todo_desc");

        this.renderTodos();

        this.todosList.on("click", ".todo_title", e => {

          this.makeDone(e)

        });

        this.todosList.on("click", ".close_but", e => {

            this.deleteTodo(e)
        });

        this.form.on("click", "button", e => {
            this.newTodo()
        })
    
    }

    async deleteTodo(e) {

        let todo = e.currentTarget.nextElementSibling,
        id = todo.dataset.id,
        url = this.url+"/"+id;
        
       await xhr("DELETE", url, null)

       this.renderTodos();
    
    };

   async makeDone(e) {
        let todo = e.target,
        id = todo.dataset.id,
        state = (todo.dataset.done == "true") ? false : true,
       data = {"done": state},
        url = this.url+"/"+id;
    
    await xhr("PATCH", url, data)

    this.renderTodos();
    };

   async renderTodos() {

        this.todosList.empty();

        let json = await xhr("GET", this.url, null);

                      
        json.forEach(el => {
            
            el.done ? this.todosList.append(this.renderTodo(el)) : this.todosList.prepend(this.renderTodo(el))
            
        });

        
}
    renderTodo(el) {

        let todo = `<div class="todo"> 
                   <div><button class="btn close_but">x</button>  <div class="todo_title ${el.done ? "done" : ""}" data-id="${el.id}" data-done="${el.done}">
                     ${el.title} ${el.done ? `<div class="done_text">zrobione!</div>` : ""}</div> </div>
                    <div class="todo_desc ${el.done ? "hidden" : ""}"> ${el.desc} </div></div> `;
        return todo
    };

  
  async newTodo() {

    let data = {
        "title": this.newTitle[0].value,
        "desc": this.newDesc[0].value,
        "done": false
    };

    this.newTitle[0].value = "";
    this.newDesc[0].value = "";

       await xhr("POST", this.url, data);

       this.renderTodos()
    };

}

const todos = new Todos("http://localhost:3000/todos");

