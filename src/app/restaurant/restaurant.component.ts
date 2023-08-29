import { Component, OnDestroy } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, Review } from '../shared/Models/restaurant';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  restaurant: Restaurant = { name: '', description: '', reviews: [] };
  destroy$ = new Subject<void>();
  stars = [1, 2, 3, 4, 5];

  constructor(
    private restaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.restaurantService
        .getRestaurant(params['id'])
        .subscribe((payLoad) => {
          this.restaurant = payLoad;
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
      this.restaurant.reviews = [...reviews, newReview];
      this.restaurantService
        .updateRestaurant(this.restaurant)
        .subscribe((payLoad) => {});
    }
  }
}
