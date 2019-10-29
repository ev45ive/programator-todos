(function($){
  $(document).ready(function(){
​
      function sendRequest(method, url, data){
​
          let xhr = new XMLHttpRequest();
                  
          
      
          let p = new Promise(function(resolve, reject){
      
              xhr.onload = function() {
                      
                  if(xhr.status === 200) {
                      resolve(JSON.parse(xhr.response));
      
                  } else {
                      reject (new Error("Wystąpił błąd")) ;
                  }
              };
      
              xhr.onerror = function() {
                  reject (new Error("Wystapił błąd"));
              };
          });
          xhr.open(method, url);
​
          if(data){
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.send(JSON.stringify(data));
          }else{
              xhr.send();
          }
​
          return p;
      };
      
      let tasks =[];
      
      function renderTodos(){
          sendRequest("GET", "http://localhost:3000/todos")
              .then(
                  resp => {
                      tasks = resp,
                      renderTasks(tasks)
                  },
                  err => $("#output").textContent = err.message
              )
      
​
      };
      
      function renderTasks(tasks){   
          tasks.forEach(task => $("#output").append(taskTemplate(task))); 
          
      };
      
      function taskTemplate(task){
​
          let todo = $("<div class='todo'></div>");
​
          todo.text(task.name);
​
​
          return todo;
​
      };
      
​
      $('#output').on('click', '.todo', function(e) {
​
          const taskName = e.target.textContent;
          const task = tasks.find( t => t.name == taskName);
​
          if(!task.completed){
              task.completed = true;
              sendRequest("PUT", "http://localhost:3000/todos"+"/"+task.id, task);
              $(this).addClass("task-completed");
          } else {
              task.completed = false;
              sendRequest("PUT", "http://localhost:3000/todos"+"/"+task.id, task);
              $(this).removeClass("task-completed");
          };
​
​
​
​
          console.log(task);
​
       });
​
      renderTodos();
  
​
  });
})(jQuery)