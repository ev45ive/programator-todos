const todoslist = new TodosListView("#output");
const form = new TodoFormView(".js-todo-form");

form._listeners.add((type, model) => {
  if (type == "submit") {
    model.save().then(() => {
      todoslist.list.fetch();
    });
  }
});

todoslist.list.fetch();

todoslist._listeners.add((type, id) => {
  if (type == "selected") {
    const data = todoslist.list.data.find(t => t.id == id);
    form.changeModel(new TodoModel(data));
  }
});

$('[value=Cancel]').click(()=>{
  form.changeModel(new TodoModel())
})

window.form = form;
