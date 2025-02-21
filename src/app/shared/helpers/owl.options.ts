import { OwlOptions } from 'ngx-owl-carousel-o';
export const customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    dotsEach:3,
    autoplayHoverPause:true,
    animateOut:true,
    autoplay: true,
    margin:10,
    center:true,
    rewind: true,
    autoplayTimeout: 4000,
    navSpeed: 700,
    navText: ['&#x27;,&#x27;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
