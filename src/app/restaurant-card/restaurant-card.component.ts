import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurant: Restaurant = new Restaurant();
  @Output() onClick = new EventEmitter();
  @Input() trashCanDisplay: boolean = false;
  userInfo = this.authService.userInfo;

  constructor(private authService: AuthenticationService) {}

  handleClick() {
    this.onClick.emit();
  }
}
