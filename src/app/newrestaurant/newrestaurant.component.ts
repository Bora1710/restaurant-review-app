import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-newrestaurant',
  templateUrl: './newrestaurant.component.html',
  styleUrls: ['./newrestaurant.component.css'],
})
export class NewrestaurantComponent {
  restaurantForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
  });
}
