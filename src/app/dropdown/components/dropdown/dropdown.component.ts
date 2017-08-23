import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'closeDropdown($event)',
  }
})
export class DropdownComponent implements OnInit {
  @Input() options: Array<any>;
  @Input() selected: number;
  @Output() onchange = new EventEmitter();
  
  selectedItem: any;
  active:boolean = false;
  constructor(private _eref: ElementRef) { }


  closeDropdown(event){
    if (!this._eref.nativeElement.contains(event.target))
    this.active = false;
  }

  ngOnInit() {
    this.selectedItem = this.selected ? this.options[this.selected - 1] : this.options[0];
  }
  
  changeValue(index){
    this.selectedItem = this.options[index];
    this.onchange.emit(index+1);
  }
}
