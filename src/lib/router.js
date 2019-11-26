// https://www.npmjs.com/package/kief

export class Router {
  constructor(paths) {
    this.paths = paths;
    this._listeners = $.Callbacks();
  }

  initialize() {
    this._hashNavigate();
    window.addEventListener("hashchange", () => this._hashNavigate());
    // window.addEventListener("popstate", () => this._historyNavigate());
  }

  addEventListener(type, fn) {
    if (type == "change") {
      this._listeners.add(fn);
    }
  }

  _historyNavigate(){
    const path = window.location.pathname
    this.navigateTo(path)
  }

  _hashNavigate() {
    const path = window.location.hash.replace(/^#/, "");
    this.navigateTo(path);
  }

  navigateTo(url) {
    let match;
    const index = this.paths.findIndex(p => {
      match = url.match(new RegExp("^" + p.path + "$"));
      return match;
    });
    const path = this.paths[index];

    this._listeners.fire({
      path,
      url,
      params: match && match.groups,
      view: path.view
    });
  }
}
