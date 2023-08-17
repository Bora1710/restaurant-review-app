import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantlistComponent } from './restaurantlist/restaurantlist.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurant-list', component: RestaurantlistComponent },
  { path: 'new-restaurant', component: NewrestaurantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
