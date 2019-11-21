import {View} from '../lib/view.js'

export class TodoModel{
  _listeners = $.Callbacks()
  constructor(data){
    this.id = data.id
    this.title = data.title;
  }
  set(prop,value){
    this[prop] = value
    this._listeners.fire()
  }
  save(){}
  fetch(){}
}

export class TodoCollection{
  _listeners = $.Callbacks()
  _data = [
    new TodoModel({id:1,title:'Todo 1'}),
    new TodoModel({id:2,title:'Todo 2'})
  ]
  getArray(){ return this._data }
  fetch(){
    this._listeners.fire(this)
  }
}

const globalTodosModel = new TodoCollection()

export class TodosView extends View{
  template(){
    return `
      <h2>Todos</h2>
      <div class ="row">
        <div class="col">
        
      <div class="list-group js-todos-container"></div>
      </div>
        <div class="col">
          <div class="js-selected-todo"></div>
        </div>
      </div>
    `
  }

  initialize(){
    super.initialize()
    this.$el.on('click','[data-todo-id]',event => {
      const id = $(event.target).data('todo-id');
      const view = new TodoItemView();
      view._model = this._collection.getArray().find(m => m.id == id)
      this.$el.find('.js-selected-todo').empty().append(view.$el)
      view.render()
    })
  }

  _collection = globalTodosModel
  _collectionEl = false
  ViewType = TodoItemView

  render(){
    if(!this._collectionEl){
      super.render()
      this._collectionEl = this.$el.find('.js-todos-container')
    }
    this._collection.getArray().forEach( model => {
      const view = new this.ViewType()
      view._model = model
      view.render()
      this._collectionEl.append(view.$el)
    })
  }

}

export class TodoItemView extends View{
  _model = null;
  
  initialize(){
    super.initialize()
    this.$el.on('click','[type=checkbox]',(event)=>{
      event.stopPropagation()
      this._model.set('completed', !this._model.completed)
    })
  }
  
  template({_model:{id,title,completed}}){
    return `<div class="list-group-item" data-todo-id="${id}">
      <input type="checkbox">
      ${title}
    </div>`
  }

  render(){
    super.render()
    this.$el.toggleClass('task-completed', !!this._model.completed)
    this.$el.find('[type=checkbox]').prop('checked',!!this._model.completed)
  }
  
}