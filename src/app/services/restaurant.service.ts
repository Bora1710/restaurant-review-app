import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../shared/Models/http';
import { url } from '../shared/constants';
import { map } from 'rxjs';
import { Restaurant } from '../shared/Models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurantsUrl = url.restaurantsUrl;

  constructor(private http: HttpClient) {}

  newRestaurant(restaurant: Restaurant) {
    let body = { selectedRestaurant: restaurant };
    return this.http
      .post<HttpResponse>(`${this.restaurantsUrl}/add`, body)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.payLoad;
          }
        })
      );
  }

  getRestaurants() {
    return this.http.get<HttpResponse>(`${this.restaurantsUrl}`).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }

  getRestaurant(id: string) {
    let currentId = id;
    return this.http
      .get<HttpResponse>(`http://localhost:8080/restaurants/${currentId}`)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.payLoad;
          }
        })
      );
  }
}
