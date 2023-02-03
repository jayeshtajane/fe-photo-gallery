import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private showBtnSource = new BehaviorSubject<boolean>(false);
  showBtn$ = this.showBtnSource.asObservable();

  constructor() {
  }

  showBtn(value: boolean) {
    this.showBtnSource.next(value);
  }
}
