import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../shared/Models/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newrestaurant',
  templateUrl: './newrestaurant.component.html',
  styleUrls: ['./newrestaurant.component.css'],
})
export class NewrestaurantComponent {
  restaurantForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.restaurantForm.valid) {
      let value: Restaurant = this.restaurantForm.value as Restaurant;
      value.dateOfCreation = new Date();

      this.restaurantService.newRestaurant(value).subscribe((payLoad) => {
        payLoad ? this.router.navigate(['/restaurant-list']) : null;
      });
    }
  }
}
