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

    this.$form.on("input", "[name=title]", e => {
      const input = $(e.target).get(0);

      if (input.value.includes("Placki")) {
        input.setCustomValidity("Nie może być Placków!");
      } else {
        input.setCustomValidity('');
      }
    });
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

  showErrors() {
    const elements = this.$form.get(0).elements;

    const errors = [];

    Array.from(elements).forEach(input => {
      const {
        badInput,
        customError,
        patternMismatch,
        rangeOverflow,
        rangeUnderflow,
        stepMismatch,
        tooLong,
        tooShort,
        typeMismatch,
        valid,
        valueMissing
      } = input.validity;

      if (customError) {
        $(".errors.errors-" + input.name).text(input.validationMessage);
      }
      if (valueMissing) {
        $(".errors.errors-" + input.name).text("Pole wymagane");
      }
      if (patternMismatch) {
        $(".errors.errors-" + input.name).text("Nie moze zaczynac sie od cyfr");
      }
    });
    console.log(errors);
  }

  submit() {
    if (!this.$form.get(0).checkValidity()) {
      this.showErrors();
      return;
    }
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
