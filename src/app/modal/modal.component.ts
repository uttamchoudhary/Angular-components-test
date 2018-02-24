import { Component, OnInit, Input, Output, OnDestroy, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Settings } from './models';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

  @Input() settings: Settings;


  @Input()
  public backdrop: boolean = true;

  @Output() public onOpen = new EventEmitter(false);
  @Output() public onClose = new EventEmitter(false);
  @Output() public onSubmit = new EventEmitter(false);

  public isOpened = false;

  @ViewChild("modalRoot")
  public modalRoot: ElementRef;

  private backdropElement: HTMLElement;

  constructor() {
    this.createBackDrop();
  }

  ngOnDestroy() {
    document.body.className = document.body.className.replace(/modal-open\b/, "");
    if (this.backdropElement && this.backdropElement.parentNode === document.body)
      document.body.removeChild(this.backdropElement);
  }

  open(...args: any[]) {
    if (this.isOpened)
      return;

    this.isOpened = true;
    this.onOpen.emit(args);
    document.body.appendChild(this.backdropElement);
    window.setTimeout(() => this.modalRoot.nativeElement.focus(), 0);
    document.body.className += " modal-open";
  }

  close(...args: any[]) {
    if (!this.isOpened)
      return;

    this.isOpened = false;
    this.onClose.emit(args);
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
