import { Component, OnInit, Input } from '@angular/core';
import { Image } from './model/image.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() IMAGES: Image[];
  currentSlide;
  currentIndex = 0;
  numOfSlides
  constructor() { }

  ngOnInit() {
    this.numOfSlides = this.IMAGES.length;
    this.currentSlide = this.IMAGES[this.currentIndex];
  }

  nextSlide(){
    this.currentIndex = (++this.currentIndex)%this.numOfSlides;
    this.currentSlide = this.IMAGES[this.currentIndex];    
  }
  prevSlide(){
    if(this.currentIndex === 0){
      this.currentIndex = this.numOfSlides - 1;
    }else{
      this.currentIndex = (--this.currentIndex)%this.numOfSlides;
    }
    this.currentSlide = this.IMAGES[this.currentIndex];
  }

}
