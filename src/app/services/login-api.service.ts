import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpResponse } from '../shared/models/http';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    let loginData = { userName: userName, password: password };
    return this.http
      .post<HttpResponse>(`http://localhost:8080/login`, loginData)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            return response.payLoad;
          }
        })
      );
  }
}
