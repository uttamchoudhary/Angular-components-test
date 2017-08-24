import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  options = ['Angular','React','Vue','Ember'];
  selected = 2;
  settings;
  constructor(){
    this.settings =  {
      dropdownCaret: true,
      dropdownCaretClass: 'icon-dropdown',
      dropdownCaretImage: false,
      isDatalist: false
    }
  }
  changeValue(index){
    this.selected = index;
  }
}
