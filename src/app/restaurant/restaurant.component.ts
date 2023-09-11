import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, Review } from '../shared/Models/restaurant';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnDestroy {
  reviewForm = new FormGroup({
    rating: new FormControl<number>(0, Validators.required),
    dateOfVisit: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  restaurant: Restaurant = new Restaurant();
  destroy$ = new Subject<void>();
  stars = [1, 2, 3, 4, 5];
  maxDate: string;

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.maxDate = new Date().toISOString().split('T')[0];
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.restaurantService
        .getRestaurant(params['id'])
        .subscribe((payLoad) => {
          this.restaurant = payLoad;
          if (payLoad) {
            this.restaurant.reviews = this.getUserPerReview(payLoad);
          }
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateRating(star: number) {
    this.reviewForm.controls.rating.setValue(star);
  }

  onSubmit() {
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

  getUserPerReview(restaurant: Restaurant) {
    let reviews: Review[] = [];
    for (let review of restaurant.reviews) {
      if (review.commentedByUserId) {
        this.authService
          .getUser(review.commentedByUserId)
          .subscribe((payLoad) => {
            if (payLoad) {
              review.commentedByUserName = payLoad.userName;
              reviews.push(review);
            }
          });
      } else {
        review.commentedByUserName = 'Unknown';
        reviews.push(review);
      }
    }
    return reviews;
  }
}
