import { Subscription } from "rxjs";

export class UnSubscriber {
  private _subs: Subscription[] = [];

  set subs(subs: Subscription) {
    this._subs.push(subs);
  }

  unsubscribe() {
    this._subs.forEach(item => item.unsubscribe());
  }
}
