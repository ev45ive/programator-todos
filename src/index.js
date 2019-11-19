import { PagesView } from "./pages/index.js";
import { UsersView } from "./users/index.js";
import { TodosView } from "./todos/index.js";

class FrontPageView {
  constructor(el) {
    this.$el = $(el);
    this.view = null;
  }

  changeView(view) {
    if (this.view) {
      this.view.destroy();
      this.$el.empty();
    }
    this.view = view;
    this.$el.append(this.view.$el);
    this.view.render();
  }
}

const frontView = new FrontPageView("#root");


window.navigateTo = function navigateTo(path) {
  let activeView = null;

  switch (path) {
    case "todos":
      activeView = new TodosView();
    break;
    case "users":
      activeView = new UsersView();
    break;
    case "pages":
    default:
      activeView = new PagesView();
  }
  frontView.changeView(activeView);
}

function hashNavigate(){
  const path = window.location.hash.replace(/^#\//,'')
  window.navigateTo(path)
}
hashNavigate()

window.addEventListener('hashchange',hashNavigate)