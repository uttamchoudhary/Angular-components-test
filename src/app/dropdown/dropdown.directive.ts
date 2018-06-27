import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dropdown]',
  host: {
    '(document:click)': 'closeDropdown($event)',
  }
})
export class DropdownDirective {

  @Input() set dropdown( isDatalist : boolean ) {
    this.isDatalist = isDatalist;
    this.bindEvents();
  }
  @Output() close = new EventEmitter();

  isDatalist : boolean;
  host;

  constructor(private el : ElementRef) { 
    this.host = this.el.nativeElement;
  }

  bindEvents(){
    if(this.isDatalist){
      this.host.querySelector('#caret').addEventListener('click', this.onClick.bind(this));
      this.host.getElementsByTagName('input')[0].addEventListener('focus', this.onFocus.bind(this));
      this.host.getElementsByTagName('input')[0].addEventListener('blur', this.onBlur.bind(this));
    }else {
      this.host.addEventListener('click', this.onClick.bind(this));
    }
  }

  onClick(){
    if(this.host.classList.contains('active'))
      this.host.classList.remove('active');
    else
      this.host.classList.add('active');
  }

  onFocus(){
    this.host.classList.add('active');
  }

  onBlur(){
    this.host.classList.remove('active');
  }

  closeDropdown(event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close.emit();
      this.host.classList.remove('active');
      //this.active = false;
      //this.changeValue(this.selectedItem);
      //this.searchTerm = this.selectedItem;
     //this.filterOptions = Object.assign([], this.options);
    }
  }

}
