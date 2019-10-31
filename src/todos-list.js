class TodosListModel {
  constructor() {
    this.data = [];
    this._listeners = $.Callbacks();
  }

  async fetch() {
    this.data = await $.getJSON("http://localhost:3000/todos");
    this._listeners.fire("fetch", this.data);
  }
}

class TodosListView extends View {
  constructor(sel) {
    super(sel);
    this._listeners = $.Callbacks();

    this.list = new TodosListModel();
    this.list._listeners.add(data => {
      this.render();
    });
    this.$el.on("click", "[data-id]", e => {
      const {id} = e.target.dataset;
      this._listeners.fire("selected", id);
      this.select(id)
    });
  }

  select(id){
    this.$el.find('[data-id]').removeClass('active')
    this.$el.find("[data-id="+id+"]").addClass('active')
  }

  render() {
    this.$el.html(`
      <div class="list-group"></div>    
    `);
    this.listEl = this.$el.find(".list-group");

    this.list.data.forEach(todo => {
      this.listEl.append(
        ` <div class="list-group-item" data-id="${todo.id}">${todo.title}</div>`
      );
    });
  }
}
