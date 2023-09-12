import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantlistComponent } from './restaurantlist/restaurantlist.component';
import { NewrestaurantComponent } from './newrestaurant/newrestaurant.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'restaurants',
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: RestaurantlistComponent },
      { path: 'new', component: NewrestaurantComponent },
      { path: ':id', component: RestaurantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
