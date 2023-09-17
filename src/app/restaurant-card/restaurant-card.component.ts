import { Component, Input } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurant: Restaurant = new Restaurant();

  stars = [1, 2, 3, 4, 5];
}
