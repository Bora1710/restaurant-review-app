import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css'],
})
export class ReviewStarsComponent {
  @Input() rating: number = 0;
  @Output() onClick = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  handleClick(rating: number) {
    this.onClick.emit(rating);
  }
}
