export class View{

  constructor(el = '<div></div>'){
    this.$el = $(el)
  }

  render(){
    if(this.template){
      this.$el.html(this.template)
    }
  }

  destroy(){}
}