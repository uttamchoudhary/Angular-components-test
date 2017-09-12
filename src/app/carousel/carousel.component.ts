import { Component, OnInit } from '@angular/core';
import { Image } from './model/image.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  IMAGES: Image[] = [
    { "title": "We are covered", "url": "../../assets/images/dashboard.PNG" },
    { "title": "Generation Gap", "url": "../../assets/images/dashborad1.PNG" },
    { "title": "Potter Me", "url": "../../assets/images/Expense.PNG" },
    { "title": "Pre-School Kids", "url": "../../assets/images/expense3.PNG" },
    { "title": "Young Peter Cech", "url": "../../assets/images/expense4.PNG" } 
  ]
  constructor() { }

  ngOnInit() {
  }

}
