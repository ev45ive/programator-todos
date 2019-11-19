import { PagesView } from "./pages/index.js";
import { UsersView } from "./users/index.js";
import { TodosView } from "./todos/index.js";
import { Router } from './lib/router.js'
import { FrontPageView } from './lib/frontpageview.js'

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
    path: "/todos",
    view: TodosView
  },
  {
    path: "/users/?(?<id>.*)?",
    view: UsersView
  },
  {
    path: "/.*",
    view: PagesView
  }
]);

frontView.listenTo(router);

router.initialize()

