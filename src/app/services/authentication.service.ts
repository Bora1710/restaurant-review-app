import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpResponse } from '../shared/Models/http';
import { url } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginUrl = url.loginUrl;
  private registerUrl = url.registerUrl;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    let loginData = { userName: userName, password: password };
    return this.http.post<HttpResponse>(`${this.loginUrl}`, loginData).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }

  register(userName: string, password: string, role: number) {
    let loginData = { userName: userName, password: password, role: role };
    return this.http.post<HttpResponse>(`${this.registerUrl}`, loginData).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }
}
