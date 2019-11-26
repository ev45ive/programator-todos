import {View} from '../lib/view.js'
import {Router} from '../lib/router.js'

export class NavigationView extends View{

  render(){
    super.render()
    this.$el.on('click', 'a', event => {
      event.preventDefault();

      // Router.navigate()
      window.location.hash = event.target.pathname
      // window.history.pushState('',event.target.textContent, event.target.pathname);
      // window.dispatchEvent(new CustomEvent('popstate'))
    })
  }

  template(){
    return `    
    <nav class="navbar navbar-expand navbar-dark bg-dark mb-3">
      <div class="container">
        <a class="navbar-brand" href="/home">Home</a>

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/todos">Todos</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="/users">Users</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`
  }

}