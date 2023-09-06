import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-restaurantlist',
  templateUrl: './restaurantlist.component.html',
  styleUrls: ['./restaurantlist.component.css'],
})
export class RestaurantlistComponent {
  restaurantList: Restaurant[] = [];
  stars = [1, 2, 3, 4, 5];
  constructor(private restaurantService: RestaurantService) {
    this.restaurantService.getRestaurants().subscribe((payLoad) => {
      this.restaurantList = payLoad;
    });
  }
}
