import { Component, Input } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css'],
})
export class ReviewStarsComponent {
  @Input() restaurant: Restaurant = new Restaurant();

  stars = [1, 2, 3, 4, 5];
}
