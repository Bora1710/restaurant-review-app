import { Component, Input } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css'],
})
export class ReviewStarsComponent {
  @Input() restaurant: Restaurant = new Restaurant();

  getFullStars(): number[] {
    return Array(Math.floor(this.restaurant.averageRating || 0)).fill(0);
  }

  hasHalfStar(): boolean {
    if (this.restaurant.averageRating) {
      return this.restaurant.averageRating % 1 !== 0.0;
    } else {
      return false;
    }
  }

  getNonFilledStars(): number[] {
    if (this.restaurant.averageRating) {
      const nonFilledCount = 5 - Math.ceil(this.restaurant.averageRating || 5);
      return Array(nonFilledCount).fill(0);
    }
    else {
      return Array(5).fill(0);
    }
  }
}
