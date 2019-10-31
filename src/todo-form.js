class View {
  constructor(selector) {
    this.$el = $(selector);
  }
}

class TodoFormView extends View {
  constructor(selector) {
    super(selector);
    this.$form = this.$el.filter("form");
    this.model = new TodoModel();

    if (!this.$form.length) {
      throw "Must contain <form></form>";
    }
    this.$form.on("submit", event => {
      event.preventDefault();
      this.submit();
    });
    this._listeners = $.Callbacks();
  }

  render() {
    const elements = this.$form.get(0).elements;
    Array.from(elements).forEach(elem => {
      if (elem.type == "checkbox") {
        elem.checked = this.model.data[elem.name];
      } else if (["button", "submit"].indexOf(elem.type) == -1) {
        elem.value = this.model.data[elem.name];
      }
    });
  }

  changeModel(model) {
    this.model = model;
    this.render();
  }

  submit() {
    const elements = this.$form.serializeArray();
    elements.forEach(elem => {
      this.model.set(elem.name, elem.value);
    });
    this._listeners.fire("submit", this.model);
  }
}

// const todo = elements.reduce(
//   (todo, item) => {
//     todo[item.name] = item.value;
//     return todo;
//   },
//   {
//     completed: false
//   }
// );
