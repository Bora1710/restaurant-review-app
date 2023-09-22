import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurant: Restaurant = new Restaurant();
  @Output() onClick = new EventEmitter();
  @Input() trashCanDisplay: boolean = false;

  handleClick() {
    this.onClick.emit();
  }
}
