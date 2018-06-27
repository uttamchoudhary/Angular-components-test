import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './dropdown.component';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DropdownComponent, DropdownDirective],
  exports:[DropdownComponent]
})
export class DropdownModule { }
