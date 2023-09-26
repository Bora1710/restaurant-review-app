import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, Review } from '../shared/Models/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
})
export class RestaurantComponent implements OnDestroy {
  restaurant: Restaurant = new Restaurant();
  destroy$ = new Subject<void>();
  stars = [1, 2, 3, 4, 5];

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router
  ) {
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

  onSubmit(reviewForm: FormGroup) {
    let reviews = this.restaurant.reviews || [];
    let newReview = reviewForm.value as Review;
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

  deleteRestaurant() {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService
        .deleteRestaurant(this.restaurant.id || '')
        .subscribe((payLoad) => {
          if (payLoad) {
            this.router.navigate(['/restaurants']);
          }
        });
    }
  }
}
