import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Restaurant } from '../shared/Models/restaurant';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent {
  @Input() restaurant: Restaurant = new Restaurant();
  @Output() submitForm = new EventEmitter<FormGroup>();

  reviewForm = new FormGroup({
    rating: new FormControl<number>(0, Validators.required),
    dateOfVisit: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  maxDate: string;
  stars = [1, 2, 3, 4, 5];

  constructor() {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  updateRating(star: number) {
    this.reviewForm.controls.rating.setValue(star);
  }

  onSubmit() {
    this.submitForm.emit(this.reviewForm);
  }
}
