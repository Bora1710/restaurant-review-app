import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpResponse } from '../shared/Models/http';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  baseUrl = 'http://localhost:8080/register';

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

  register(userName: string, password: string, role: number) {
    let loginData = { userName: userName, password: password, role: role };
    return this.http.post<HttpResponse>(`${this.baseUrl}`, loginData).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }
}
