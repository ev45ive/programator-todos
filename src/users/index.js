import { View } from "../lib/view.js";

export class UsersCollectionModel {
  constructor() {
    this._data = [];
    this.url = "http://localhost:3000/users";
    this._listeners = $.Callbacks();
  }

  on(type, fn) {
    if (type == "change") {
      this._listeners.add(fn);
    }
  }

  toArray() {
    return this._data;
  }

  async fetchById(id){
    // ...
  }

  async fetch() {
    const response = await window.fetch(this.url);
    const result = await response.json();
    this._data = result;
    this._listeners.fire(this._data);
  }
}

const serverCollection = new UsersCollectionModel()

export class UsersView extends View {
  constructor(el = "<div></div>", model = serverCollection) {
    super(el);
    this.model = model;
    this.model.on("change", () => this.render());
  }

  template = `<div>
    <div class="list-group">
    </div>
    <button class="js-refresh">Refresh</button>
  </div>`;

  urlParams({id} = {}){
    this.selectedId = id
  }

  render() {
    if (!this.collection$) {
      // console.log('first render')
      super.render();
      this.collection$ = this.$el.find(".list-group");
      this.$el.on("click", ".js-refresh", event => this.model.fetch());
      this.$el.on("click", "[data-user-id]", event => {
        const id = $(event.target).data("user-id");
        window.location.hash = "#/users/" + id;
      });
    }
    // console.log('rerender')
    this.collection$.empty();
    const items = this.model.toArray();
    items.forEach(item => {
      this.collection$.append(
        `<div class="list-group-item ${this.selectedId == item.id? 'active':''}" 
              data-user-id="${item.id}">${item.name}</div>`
      );
    });
  }
}
