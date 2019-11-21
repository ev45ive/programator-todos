export class View{

  constructor(el = '<div></div>'){
    this.$el = $(el)
  }

  render(){
    if('function' === typeof this.template){
      this.$el.html(this.template(this))
    }else if('string' === typeof this.template){
      this.$el.html(this.template)
    }else{
      throw Error('View::render() - Template must be as string or function')
    }
  }

  destroy(){}
}