import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../shared/Models/restaurant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent {
  restaurant: Restaurant = { name: '', description: '' };

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {
    let currentId = '';
    this.route.params.subscribe(params => {currentId = params['id']});

    this.restaurantService.getRestaurant(currentId).subscribe((payLoad) => {
      this.restaurant = payLoad;
    });
  }
}
