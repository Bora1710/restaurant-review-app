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
    rating: new FormControl(0, Validators.required),
    dateOfVisit: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
  });
  restaurant: Restaurant = { name: '', description: '' };
  destroy$ = new Subject<void>();
  stars = [1, 2, 3, 4, 5];
  rating = 0;

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
    this.rating = star;
  }

  onSubmit() {}
}
