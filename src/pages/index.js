import {View} from '../lib/view.js'


export class PagesView extends View{

  content = "Placki"

  template = ({content}) => `<div>
    <h3>Pages</h3>
    <p>${content}</p>  
  </div>`
}
