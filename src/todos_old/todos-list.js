class TodosListModel {
  constructor() {
    this.data = [];
    this._listeners = $.Callbacks();
  }

  get(id){
    return this.data.find(m => m.id == id)
  }

  async fetch() {
    // this.data = await $.getJSON("http://localhost:3000/todos");

    const resp = await fetch('http://localhost:3000/todos')
    const data = await resp.json()
    this.data = data.map( todo =>{
      return new TodoModel(todo)
    })

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
    this.$el.on('click'," [data-id] .close", async e=>{
      const id = $(e.target).closest('[data-id]').data('id')
      const todoModel = this.list.get(id)
      await todoModel.delete()
      await this.list.fetch()
    })
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
      const {id,title} = todo.data
      this.listEl.append(
        ` <div class="list-group-item" data-id="${id}">
            ${title}
            <span class="close">&times;</span>
        </div>`
      );
    });
  }
}
