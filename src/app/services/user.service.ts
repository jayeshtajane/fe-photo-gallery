import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppResponse } from '../models/app-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.api + 'users';
  constructor(private http: HttpClient) { }

  getUser(): Observable<any> {
    return this.http.get(this.api + '/get-user');
  }

  addUser(user: User): Observable<AppResponse<User>> {
    return this.http.post<AppResponse<User>>(this.api + '/register', user);
  }

  updateUser(user: User): Observable<AppResponse<User>> {
    return this.http.put<AppResponse<User>>(this.api + '/update', user);
  }
}
