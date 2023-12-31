import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { HttpResponse } from '../shared/Models/http';
import { url } from '../shared/constants';
import { User } from '../shared/Models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginUrl = url.loginUrl;
  private registerUrl = url.registerUrl;
  private userUrl = url.userUrl;
  userInfo: User = { userName: '', id: '', password: '', role: 0 };
  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    let loginData = { userName: userName, password: password };
    return this.http.post<HttpResponse>(`${this.loginUrl}`, loginData).pipe(
      map((response) => {
        if (response.isSuccess) {
          this.userInfo = response.payLoad.user;
          localStorage.setItem('token', response.payLoad.token);
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

  userInfoFromToken(id: string) {
    return this.http.get<HttpResponse>(`${this.userUrl}/token/${id}`).pipe(
      map((response) => {
        if (response.isSuccess) {
          this.userInfo.userName = response.payLoad.userName;
          this.userInfo.id = response.payLoad.id;
          this.userInfo.password = response.payLoad.password;
          this.userInfo.role = response.payLoad.role;
        }
      })
    );
  }

  getUser(id: string) {
    return this.http.get<HttpResponse>(`${this.userUrl}/${id}`).pipe(
      map((response) => {
        if (response.isSuccess) {
          return response.payLoad;
        }
      })
    );
  }
}
