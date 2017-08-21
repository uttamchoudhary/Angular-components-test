import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options = ['Angular','React','Vue','Ember'];
  selected = 2;
  constructor(){

  }
  changeValue(index){
    this.selected = index;
  }
}
