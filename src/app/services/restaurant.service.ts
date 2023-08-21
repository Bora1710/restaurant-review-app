import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../shared/Models/http';
import { url } from '../shared/constants';
import { map } from 'rxjs';
import { Restaurant } from '../shared/Models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurantIdUrl = url.restaurantIdUrl;
  private restaurantListUrl = url.restaurantListUrl;

  constructor(private http: HttpClient) {}

  newRestaurant(restaurant: Restaurant) {
    let body = { selectedRestaurant: restaurant };
    return this.http.post<HttpResponse>(`${this.restaurantIdUrl}`, body).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }

  getRestaurant() {
    return this.http.get<HttpResponse>(`${this.restaurantListUrl}`).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }
}
