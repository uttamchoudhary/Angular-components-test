import { Component, OnInit, Input } from '@angular/core';
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
    this.transitionDuration = '1s';
    let move, position;
    for(let i=0; i<this.numOfSlides; i++){
      move = (100/this.numOfSlides * i) + '%';
      position = '-' + move;
      this.positionList.push('translateX(' + position + ')');
    }
    console.log(this.positionList)
  }

  nextSlide(){
    this.transitionDuration = '1s';
    this.leftPosition = this.positionList[++this.currentIndex];
    if(this.currentIndex === this.numOfSlides -1){
      setTimeout(() => {
          this.transitionDuration = '0s';
          this.currentIndex = 1;
          this.leftPosition = this.positionList[this.currentIndex];
      }, 1000);
    }
  }

  prevSlide(){
    this.transitionDuration = '1s';
    this.leftPosition = this.positionList[--this.currentIndex];
    if(this.currentIndex === 0){
      setTimeout(() => {
          this.transitionDuration = '0s';
          this.currentIndex = this.numOfSlides - 2;
          this.leftPosition = this.positionList[this.currentIndex];
      }, 1000);    
    }
  }

  navigate(index){
    this.transitionDuration = '1s';
    this.currentIndex = index + 1;
    this.leftPosition = this.positionList[this.currentIndex];
  }
 
}
