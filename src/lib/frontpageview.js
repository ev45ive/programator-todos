export class FrontPageView {
  constructor(el) {
    this.$el = $(el);
    this.view = null;
  }

  listenTo(router){
    router.addEventListener('change',(route) => {
      this.changeView(route.view, route.params);
    })
  }
  
  changeView(View, params) {
    if (this.view !== View) {
      // this.view.destroy();
      this.$el.empty();
      this.view = View;
      this.active = new View();
      this.$el.append(this.active.$el);
    }
    this.active.urlParams && this.active.urlParams(params)
    this.active.render();
  }
}