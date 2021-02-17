import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    // navText: ['&#8249', '&#8250;'],
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      }
    },
    nav: false,
  };
  constructor(
  ) {

  }
  ngOnInit(): void {

  }


}
