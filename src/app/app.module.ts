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

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, NewrestaurantComponent, RestaurantlistComponent, RestaurantComponent, StarIconComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}