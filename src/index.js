import { PagesView } from "./pages/index.js";
import { UsersView } from "./users/index.js";
import { TodosView } from "./todos/index.js";
import { MateuszPageView } from "./pages/mateusz.js";
import { Router } from './lib/router.js'
import { FrontPageView } from './lib/frontpageview.js'
import { NavigationView } from "./nav/index.js";

const navView = new NavigationView('#nav');
navView.render()

const frontView = new FrontPageView("#root");

const router = new Router([
  {
    path: "/",
    view: PagesView
  },
  {
    path: "/pages",
    view: PagesView
  },
  {
    path: "/pages/mateusz",
    view: MateuszPageView
  },
  {
    path: "/pages/kamila",
    view: KamilaPageView
  },
  {
    path: "/todos",
    view: TodosView
  },
  {
    path: "/users/?(?<id>.*)?",
    view: UsersView
  },
  {
    path: ".*",
    view: PagesView
  }
]);

frontView.listenTo(router);

router.initialize()

