import { Component, ViewChild, ElementRef } from '@angular/core';
import { Settings } from '../modal/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  options1: Settings = {
    closeOnEscape: true,
    closeOnOutsideClick: true,
    title: 'Title',
    hideCloseButton: false,
    secondaryButtonLabel: 'cancel',
    primaryButtonLabel: 'Submit',
    backdrop: true
}

options2: Settings = {
  closeOnEscape: true,
  closeOnOutsideClick: true,
  title: 'Title',
  hideCloseButton: true,
  backdrop: true
}
options3: Settings = {
  closeOnEscape: true,
  closeOnOutsideClick: true,
  title: 'Title',
  hideCloseButton: false,
  backdrop: false
}
options4: Settings = {
  closeOnEscape: false,
  closeOnOutsideClick: true,
  title: 'Title',
  hideCloseButton: false,
  secondaryButtonLabel: 'cancel',
  backdrop: true
}
options5: Settings = {
  modalClass: 'modal-sm',
  closeOnEscape: true,
  closeOnOutsideClick: true,
  title: 'Title',
  hideCloseButton: false,
  secondaryButtonLabel: 'cancel',
  backdrop: true
}

onOpen(){
  console.log('opened')
}

onSubmit(firstModal){
  console.log('Submited');
  firstModal.close();
}

onClose(){
  console.log('Closed')
}


  
}
