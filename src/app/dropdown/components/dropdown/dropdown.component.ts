import { Settings } from './../model/settings.model';
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
  @Input() settings: Settings;

  @Output() onchange = new EventEmitter();

  selectedItem: any;
  searchTerm: any;
  filterOptions: Array<any>;
  active: boolean = false;
  constructor(private _eref: ElementRef) { }


  closeDropdown(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.active = false;
      this.searchTerm = this.selectedItem;
      this.filterOptions = Object.assign([], this.options);
    }
  }

  ngOnInit() {
    this.selectedItem = this.selected ? this.options[this.selected - 1] : this.options[0];
    this.searchTerm = this.selectedItem;
    this.filterOptions = Object.assign([], this.options);
  }

  changeValue(index) {
    this.selectedItem = this.filterOptions[index];
    this.searchTerm = this.selectedItem; 
    if(this.settings['output'] === "value" || this.settings['output'] === "Value"){
      this.onchange.emit(this.selectedItem);     
    }else{
      this.onchange.emit(index);
    }
  }
  search() {
    if (this.searchTerm === "") {
      this.filterOptions = Object.assign([], this.options);
      return;
    }

    let reg = new RegExp(this.searchTerm, 'gi');
    this.filterOptions = this.options.filter(function (elem) {
      if (reg.test(elem)) {
        return elem;
      }
    });
  }
}
