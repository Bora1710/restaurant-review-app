import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';
import { RestaurantlistComponent } from './restaurantlist/restaurantlist.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { StarIconComponent } from './shared/star-icon/star-icon.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { ReviewStarsComponent } from './review-stars/review-stars.component';
import { HalfStarComponent } from './shared/half-star/half-star.component';
import { FullStarComponent } from './shared/full-star/full-star.component';
import { TrashIconComponent } from './shared/trash-icon/trash-icon.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, NewrestaurantComponent, RestaurantlistComponent, RestaurantComponent, StarIconComponent, RestaurantCardComponent, ReviewCardComponent, ReviewStarsComponent, HalfStarComponent, FullStarComponent, TrashIconComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}