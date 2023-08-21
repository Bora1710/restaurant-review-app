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
  constructor(private restaurantService: RestaurantService) {
    this.restaurantService.getRestaurant().subscribe((payLoad) => {
      this.restaurantList = payLoad;
    });
  }
}
