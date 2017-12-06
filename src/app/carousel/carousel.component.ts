import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from './model/image.model';
import { Settings } from './model/settings.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() IMAGES: Image[];
  @Input() SETTINGS: Settings;

  @Output() onclick = new EventEmitter();
  
  numOfSlides: number;
  images;
  carouselWidth: string;
  slideWidth: string;
  leftPosition: string;
  positionList;
  transitionDuration: string;
  currentIndex: number;

  constructor() { 
    this.positionList = new Array();
    this.images = new Array();
  }

  ngOnInit() {
    this.numOfSlides = this.IMAGES.length;
    this.images.push(this.IMAGES[this.numOfSlides - 1]);
    this.images.push(...this.IMAGES);
    this.images.push(this.IMAGES[0]);
    this.numOfSlides += 2;
    this.carouselWidth = this.numOfSlides*100 + '%';
    this.slideWidth = 100/this.numOfSlides + '%';
    this.leftPosition = 'translateX(-' + this.slideWidth + ')';
    this.currentIndex = 1;
    this.transitionDuration = this.SETTINGS.transitionDuration + 'ms';
    let move, position;
    for(let i=0; i<this.numOfSlides; i++){
      move = (100/this.numOfSlides * i) + '%';
      position = '-' + move;
      this.positionList.push('translateX(' + position + ')');
    }
    setInterval(() => {
      this.nextSlide();
    }, this.SETTINGS.transitionDelay);
  }

  nextSlide(){
    this.transitionDuration = this.SETTINGS.transitionDuration + 'ms';    
    this.leftPosition = this.positionList[++this.currentIndex];
    if(this.currentIndex === this.numOfSlides -1){
      setTimeout(() => {
          this.transitionDuration = '0s';
          this.currentIndex = 1;
          this.leftPosition = this.positionList[this.currentIndex];
      }, this.SETTINGS.transitionDuration);
    }
  }

  prevSlide(){
    this.transitionDuration = this.SETTINGS.transitionDuration + 'ms';
    this.leftPosition = this.positionList[--this.currentIndex];
    if(this.currentIndex === 0){
      setTimeout(() => {
          this.transitionDuration = '0s';
          this.currentIndex = this.numOfSlides - 2;
          this.leftPosition = this.positionList[this.currentIndex];
      }, this.SETTINGS.transitionDuration);    
    }
  }

  navigate(index){
    this.transitionDuration = this.SETTINGS.transitionDuration + 'ms';
    this.currentIndex = index + 1;
    this.leftPosition = this.positionList[this.currentIndex];
  }

  clicked(){
    this.onclick.emit(this.currentIndex - 1);
  }
 
}
