import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Restaurant, Review } from '../shared/Models/restaurant';
import { AuthenticationService } from '../services/authentication.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent implements OnDestroy {
  @Input() restaurant: Restaurant = new Restaurant();

  reviewForm = new FormGroup({
    rating: new FormControl<number>(0, Validators.required),
    dateOfVisit: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });

  maxDate: string;
  stars = [1, 2, 3, 4, 5];
  destroy$ = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private restaurantService: RestaurantService
  ) {
    this.maxDate = new Date().toISOString().split('T')[0];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateRating(star: number) {
    this.reviewForm.controls.rating.setValue(star);
  }

  onSubmit() {
    debugger;
    if (this.reviewForm.valid) {
      let reviews = this.restaurant.reviews || [];
      let newReview = this.reviewForm.value as Review;
      newReview.commentedByUserId = this.authService.userInfo.id;
      newReview.commentedByUserName = this.authService.userInfo.userName;
      this.restaurant.reviews = [...reviews, newReview];
      this.restaurantService
        .updateRestaurant(this.restaurant)
        .pipe(takeUntil(this.destroy$))
        .subscribe((payLoad) => {
          this.restaurant.calculateAverageRating();
        });
    }
  }
}
