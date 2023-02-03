import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  api = environment.api + 'explore';

  constructor(private http: HttpClient, private appService: AppService) { }

  getAvailableThings(): Observable<any> {
    return this.http.get(this.api + '/things?pageNo=1&sort=1&itemsPerPage=5');
  }

  search(searchText: string): Observable<any> {
    searchText = searchText.toLowerCase();
    return this.http.get(this.api + '/search?pageNo=1&sort=1&itemsPerPage=5&searchText=' + searchText);
  }

}
