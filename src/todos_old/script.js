const todoslist = new TodosListView("#output");
const form = new TodoFormView(".js-todo-form");

form._listeners.add(async (type, model) => {
  if (type == "submit") {
    await model.save();
    todoslist.list.fetch();
  }
});

todoslist.list.fetch();

todoslist._listeners.add((type, id) => {
  if (type == "selected") {
    const model = todoslist.list.get(id);
    form.changeModel(model);
  }
});

$("[value=Cancel]").click(() => {
  form.changeModel(new TodoModel());
});

window.form = form;
