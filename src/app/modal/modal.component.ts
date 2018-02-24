import { Component, OnInit, Input, Output, OnDestroy, OnChanges, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Settings } from './models';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {

  @Input() config: Settings;

  @Output() public onOpen = new EventEmitter(false);
  @Output() public onClose = new EventEmitter(false);
  @Output() public onSubmit = new EventEmitter(false);

  public isOpened = false;

  @ViewChild("modalRoot")
  public modalRoot: ElementRef;
  private settings: Settings;
  private backdropElement: HTMLElement;

  constructor() {
    this.settings = {
      closeOnEscape: true,
      closeOnOutsideClick: true,
      hideCloseButton: false,
      backdrop: true
    }
  }

  ngOnChanges() {
    this.settings = Object.assign(this.settings, this.config);
    this.createBackDrop();
  }


  open() {
    if (this.isOpened)
      return;

    this.isOpened = true;
    this.onOpen.emit();
    document.body.appendChild(this.backdropElement);
    window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
    document.body.className += " modal-open";
  }

  close() {
    if (!this.isOpened)
      return;

    this.isOpened = false;
    this.onClose.emit();
    document.body.removeChild(this.backdropElement);
    document.body.className = document.body.className.replace(/modal-open\b/, "");
  }

  public preventClosing(event: MouseEvent) {
    event.stopPropagation();
  }

  private createBackDrop() {
    this.backdropElement = document.createElement("div");
    this.backdropElement.classList.add("fade");
    this.backdropElement.classList.add("in");
    if (this.settings && this.settings.backdrop) {
      this.backdropElement.classList.add("modal-backdrop");
    }
  }

}
