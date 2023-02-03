import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDetails } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl = environment.serverUrl + 'authentication';

  constructor(private http: HttpClient) { }

  login(loginDetails: LoginDetails): Observable<{jwt: string}> {
    return this.http.post<{jwt: string}>(this.loginUrl, loginDetails);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
