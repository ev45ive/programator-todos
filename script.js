$(function() {
  let tasks = [];

  function fetchTodos() {
    sendRequest("GET", "http://localhost:3000/todos").then(
      resp => {
        tasks = resp;
        renderTasks(tasks);
      },
      err => ($("#output").textContent = err.message)
    );
  }

  function renderTasks(tasks) {
    tasks.forEach(task => $("#output").append(taskTemplate(task)));
  }

  function taskTemplate(task) {
    const todo = $(`<div class='todo' data-id="${task.id}">
      ${task.name}
    </div>`).toggleClass("task-completed", task.completed);

    return todo;
  }

  $("#output").on("click", ".todo", function(e) {
    const id = e.target.dataset.id;

    // Find Task
    const task = tasks.find(t => t.id == id);

    // Update Task
    task.completed = !task.completed;

    // Update View / DOM
    $(this).toggleClass("task-completed", task.completed);

    // Update Server
    sendRequest("PUT", "http://localhost:3000/todos" + "/" + task.id, task);
  });

  fetchTodos();
});

function sendRequest(method, url, data) {
  let xhr = new XMLHttpRequest();

  let p = new Promise(function(resolve, reject) {
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error("Wystąpił błąd"));
      }
    };

    xhr.onerror = function() {
      reject(new Error("Wystapił błąd"));
    };
  });
  xhr.open(method, url);

  if (data) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }

  return p;
}
