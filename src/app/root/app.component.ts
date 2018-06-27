import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  modelForm : FormGroup;
  options = [
    {
      key: 'order_details',
      name: 'uttam',
      status: 0
    },
    {
      key: 'send_to',
      name: 'Sachin',
      status: 0
    },
    {
      key: 'pick_to',
      name: 'Anuj',
      status: 0
    },
    {
      key: 'pick_from',
      name: 'Sunny',
      status: 0
    }
  ];
  current;
  //selected = 2;
  settings;
  displayed;
  searchKeys =['key','name'];
  constructor(private _fb: FormBuilder){
    this.current = this.options[1];
    this.settings =  {
      output:'value',
      isDatalist: true,      
      caretClass: 'icon-dropdown'
    }
    this.modelForm = this._fb.group({
      selectBox : [this.options[2], Validators.required]
    })
  }
  changeValue(index){
    this.displayed = index;
  }

  printValue(templateForm){
    console.log('Template form : ', templateForm.value);
    console.log('Model form : ', this.modelForm.value);
    // this.modelForm.patchValue({
    //   selectBox : this.options[0]
    // })
    // this.searchKeys.splice(1,1);
    console.log('Model form : ', this.modelForm.value);
    
  }
}
