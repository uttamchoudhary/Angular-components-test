import { Component, ViewChild, ElementRef } from '@angular/core';
import { Settings } from '../modal/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  
  options: Settings = {
    modalClass: 'my-modal',
    closeOnEscape: true,
    closeOnOutsideClick: true,
    title: 'Title',
    hideCloseButton: false,
    secondaryButtonLabel: 'cancel',
    primaryButtonLabel: 'Submit',
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
