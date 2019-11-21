export class View{

  constructor(el = '<div></div>'){
    this.$el = $(el)
  }

  initialize(){
    if(this._model){
      this._model._listeners.add(() => this.render())
    }
    this._initialized = true
  }

  render(){
    if(!this._initialized){
      if('function' === typeof this.template){
        this.$el.html(this.template(this))
      }else if('string' === typeof this.template){
        this.$el.html(this.template)
      }else{
        throw Error('View::render() - Template must be as string or function')
      }
      this.initialize()
    }

  }

  destroy(){}
}