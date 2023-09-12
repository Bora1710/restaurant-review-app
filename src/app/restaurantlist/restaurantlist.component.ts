import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../shared/Models/restaurant';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantlist',
  templateUrl: './restaurantlist.component.html',
  styleUrls: ['./restaurantlist.component.css'],
})
export class RestaurantlistComponent {
  restaurantList: Restaurant[] = [];
  userInfo = this.authService.userInfo;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.restaurantService.getRestaurants().subscribe((payLoad) => {
      this.restaurantList = payLoad;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
