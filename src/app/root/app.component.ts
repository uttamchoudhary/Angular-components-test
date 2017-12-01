import { Image } from './../carousel/model/image.model';
import { Settings } from './../carousel/model/settings.model';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  images: Image[] = [
    { "caption": "We are covered", "media": "../../assets/images/dashboard.PNG" },
    { "caption": "Generation Gap", "media": "../../assets/images/dashborad1.PNG" },
    { "caption": "Potter Me", "media": "../../assets/images/Expense.PNG" },
    { "caption": "Pre-School Kids", "media": "../../assets/images/expense3.PNG" },
    { "caption": "Young Peter Cech", "media": "../../assets/images/expense4.PNG" } 
  ];
  settings: Settings = {
    height:'400px',
    width: '600px',
    carouselDotClass: 'icons-dot',
    prevIconClass: 'icon-navigate-left',
    nextIconClass: 'icon-navigate-right',
    transitionDuration: 1000,
    transitionDelay:5000
  }
  
}
