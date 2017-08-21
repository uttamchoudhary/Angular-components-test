import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<any>;
  @Input() selected: number;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  changeValue(index){
    this.change.emit(index+1);
  }
}
