import { Component } from '@angular/core';

@Component({
  selector:    'dict-drop',  
  //templateUrl: './dict-drop.component.html'

  template:	`
  <h3>Definitions: </h3><ul>
  <li>List of definitions here</li>
  </ul>
  <h3>Synonyms: </h3><ul>
  <li>List of synonyms here</li>
  </ul>
  <h3>Google Results: </h3><ul>
  <li>Top Google results here</li>
  </ul>
  `

})
export class DictDropComponent /*implements OnInit*/ {
/* . . . */
}