import { Component ,ElementRef } from '@angular/core';

@Component({
  selector: 'swipe-app',
  templateUrl: 'template/swipe.html',
  styleUrls: ['css/swipe.css'],
})
export class SwipeComponent {
  source : any = [];
  constructor(private el: ElementRef ) {}
}