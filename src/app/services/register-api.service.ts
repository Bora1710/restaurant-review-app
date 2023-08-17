import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpResponse } from '../shared/Models/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  baseUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient) {}

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
