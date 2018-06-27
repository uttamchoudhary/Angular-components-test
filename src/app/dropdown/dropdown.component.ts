import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'ng-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '(document:click)': 'closeDropdown($event)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    }
  ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor, Validator {

  // List of options
  @Input() options: Array<any>;

  //name of key to displayed as options
  @Input() displayKey: string;

  //Class name for caret icon
  @Input() caretClass: string;

  //if dropdown is multiselect
  @Input() multiSelect: boolean;

  //True if Dropdown should behave like a datalist
  @Input() isDatalist: boolean;

  //List of properties for which searching is applied in list
  @Input() searchKeys: Array<string>;

  @ViewChild('searchInput') searchInput: ElementRef;

  //@Input() selected: number;
  //@Input() settings: Settings;

  @Output() change = new EventEmitter();

  selectedItem: any;
  searchTerm: FormControl;
  filterOptions: Array<any>;

  active: boolean = false;
  positionTop: any;
  positionRight: any;

  constructor(private _eref: ElementRef) {
    this.searchTerm = new FormControl();
  }

  private propagateChange = (_: any) => { }

  writeValue(obj: any) {
    this.selectedItem = obj;
    obj ? this.searchTerm.setValue(obj[this.displayKey]) : null;
  }

  registerOnTouched() { }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  validate(): ValidationErrors {
    return null
  }




  ngOnInit() {
    //this.selectedItem = this.options[0];
    this.getCaretPosition();
    // this.selectedItem = this.selected ? this.options[this.selected - 1] : this.options[0];
    // this.searchTerm = this.selectedItem;
    if(!this.displayKey)
      this.displayKey = Object.keys(this.options[0])[0];
    this.searchTerm.setValue(this.options[0][this.displayKey]);
    this.filterOptions = Object.assign([], this.options);
    this.isDatalist ? this.initSearch() : null;
  }

  initSearch() {
    if(!this.searchKeys || !this.searchKeys.length)
      this.searchKeys = [this.displayKey];
    this.searchTerm.valueChanges
      .sample(Observable.fromEvent(this.searchInput.nativeElement, 'input'))
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(term => {
        return Observable.of(
          this.options.filter(option => {
            for(let i = 0, len = this.searchKeys.length; i < len; i++){
              if (option[this.searchKeys[i]].toLowerCase().indexOf(term.toLowerCase()) > -1) {
                return option;
              }
            }
            
            // if (v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 || v.address.toLowerCase().indexOf(term.toLowerCase()) > -1)
            //   return v;
          }))
      }).subscribe(list => {
        this.filterOptions = list;
      })
  }

  changeValue(option) {
    this.searchTerm.setValue(option[this.displayKey]);
    this.propagateChange(option);
    this.change.emit(option);
    this.selectedItem = option;
    //this.searchTerm = this.selectedItem; 
    // if(this.settings && (this.settings['output'] === "value" || this.settings['output'] === "Value")){
    //   this.onchange.emit(this.selectedItem);     
    // }else{
    //   this.onchange.emit(index);
    // }
  }

  closeDropdown(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      //this.close.emit();
     // this.host.classList.remove('active');
      this.active = false;
      this.changeValue(this.selectedItem);
      //this.searchTerm = this.selectedItem;
     this.filterOptions = Object.assign([], this.options);
    }
      // this.changeValue(this.selectedItem);
      // this.filterOptions = Object.assign([], this.options);
  }

  getCaretPosition() {
    let computedStyles = window.getComputedStyle(this._eref.nativeElement.querySelector('.ng-dropdown-wrapper'), null);
    this.positionTop = computedStyles.getPropertyValue("padding-top");
    this.positionRight = computedStyles.getPropertyValue("padding-right");
  }
}
