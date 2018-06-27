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

  //contains various Config classes for dropdown 
  @Input() styleGuide : any;

  //True if Dropdown should behave like a datalist
  @Input() isDatalist: boolean;

  //List of properties for which searching is applied in list
  @Input() searchKeys: Array<string>;

  @ViewChild('searchInput') searchInput: ElementRef;

  @Output() onChange = new EventEmitter();

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
    obj ? this.searchTerm.setValue(obj[this.displayKey] || obj) : null;
  }

  registerOnTouched() { }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  validate(): ValidationErrors {
    return this.selectedItem ? null : { required : true };
  }


  ngOnInit() {
    this.selectedItem = this.options[0];
    setTimeout(() => {
      this.getCaretPosition();
    })

    if(!this.displayKey && typeof this.options[0] === 'object')
      this.displayKey = Object.keys(this.options[0])[0];
    this.searchTerm.setValue(this.options[0][this.displayKey] || this.options[0]);
    this.filterOptions = Object.assign([], this.options);
    this.isDatalist ? this.initSearch() : null;
  }

  initSearch() {
    if((!this.searchKeys || !this.searchKeys.length) && this.displayKey && typeof this.options[0] === 'object')
      this.searchKeys = [this.displayKey];
    else if(!this.displayKey || typeof this.options[0] !== 'object')
      this.searchKeys = ['0'];
    this.searchTerm.valueChanges
      .sample(Observable.fromEvent(this.searchInput.nativeElement, 'input'))
      .debounceTime(100)
      .distinctUntilChanged()
      .switchMap(term => {
        return Observable.of(
          this.options.filter(option => {
            for(let i = 0, len = this.searchKeys.length; i < len; i++){
              if (typeof option === "object" && option[this.searchKeys[i]].toString().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                return option;
              }else if(typeof option !== "object" && option.toString().toLowerCase().indexOf(term.toLowerCase()) > -1)
                return option;
            }
          }))
      }).subscribe(list => {
        this.filterOptions = list;
      })
  }

  changeValue(option) {
    this.searchTerm.setValue(option[this.displayKey] || option);
    this.propagateChange(option);
    this.onChange.emit(option);
    this.selectedItem = option;
  }

  closeDropdown(event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.active = false;
      this.searchTerm.setValue(this.selectedItem[this.displayKey] || this.selectedItem);
      this.filterOptions = Object.assign([], this.options);
    }
  }

  getCaretPosition() {
    let computedStyles = window.getComputedStyle(this._eref.nativeElement.querySelector('.ng-dropdown-wrapper'), null);
    this.positionTop = computedStyles.getPropertyValue("padding-top");
    this.positionRight = computedStyles.getPropertyValue("padding-right");
  }
}
