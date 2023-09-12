import { Component, Input } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurantcard.component.html',
  styleUrls: ['./restaurantcard.component.css'],
})
export class RestaurantcardComponent {
  @Input() restaurant: Restaurant = new Restaurant();

  stars = [1, 2, 3, 4, 5];
}
