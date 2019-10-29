import { xhr } from "./xhr.js";

// Server + listeners
class TodosModel{}


class TodosList {
  constructor(url, selector = ".todos") {
    this.todosList = $(selector);
    this.url = url;
    this.render();

    this.todosList.on("click", ".todo_title", e => {
      this.makeDone(e);
    });

    this.todosList.on("click", ".close_but", e => {
      this.deleteTodo(e);
    });
  }

  async deleteTodo(e) {
    let todo = e.currentTarget.nextElementSibling,
      id = todo.dataset.id,
      url = this.url + "/" + id;

    await xhr("DELETE", url, null);

    this.render();
  }

  async makeDone(e) {
    let todo = e.target,
      id = todo.dataset.id,
      state = todo.dataset.done == "true" ? false : true,
      data = { done: state },
      url = this.url + "/" + id;

    await xhr("PATCH", url, data);

    this.render();
  }

  async render() {
    let json = await xhr("GET", this.url, null);
    this.todosList.empty();

    json.forEach(el => {
      el.done
        ? this.todosList.append(this.renderTodo(el))
        : this.todosList.prepend(this.renderTodo(el));
    });
  }

  renderTodo(el) {
    let todo = `<div class="todo"> 
        <div><button class="btn close_but">x</button>  
        <div class="todo_title ${el.done ? "done" : ""}" data-id="${
      el.id
    }" data-done="${el.done}">
            ${el.title} ${
      el.done ? `<div class="done_text">zrobione!</div>` : ""
    }</div> </div>
                    <div class="todo_desc ${el.done ? "hidden" : ""}"> ${
      el.desc
    } </div></div> `;
    return todo;
  }
}

class TodosForm {
  constructor(url) {
    this.url = url;
    this.form = $("#new_todo");
    this.newTitle = $(".new_todo_title");
    this.newDesc = $(".new_todo_desc");

    this.form.on("click", "button", e => {
      this.newTodo();
    });
    this._listeners = [];
  }

  async newTodo() {
    let data = {
      title: this.newTitle[0].value,
      desc: this.newDesc[0].value,
      done: false
    };

    this.newTitle[0].value = "";
    this.newDesc[0].value = "";

    await xhr("POST", this.url, data);

    this._listeners.forEach(_listener => _listener.render());
  }
}

window.todosform = new TodosForm("http://localhost:3000/todos");

window.todos = new TodosList("http://localhost:3000/todos");
window.todos2 = new TodosList("http://localhost:3000/todos",".todos2");

window.todosform._listeners.push(todos,todos2)
