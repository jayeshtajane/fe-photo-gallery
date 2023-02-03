import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    let user = localStorage.getItem('user');
    return JSON.parse(user == null ? '{}' : user);
  }
}
