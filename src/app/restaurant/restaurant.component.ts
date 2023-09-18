import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, Review } from '../shared/Models/restaurant';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

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
    private authService: AuthenticationService
  ) {
    debugger;
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
