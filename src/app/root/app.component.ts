import { Settings } from './../dropdown/model/settings.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  options = ['Angular','react','Vue','Ember'];
  selected = 2;
  settings: Settings;
  displayed;
  constructor(){
    this.settings =  {
      output:'value',
      isDatalist: true,      
      caretClass: 'icon-dropdown'
    }
  }
  changeValue(index){
    this.displayed = index;
  }
}
