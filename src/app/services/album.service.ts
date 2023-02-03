import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AlbumContainer } from '../models/album';
import { ImageContainer } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private api = environment.api;
  constructor(private _http: HttpClient) { }

  getAvailableAlbums(): Observable<any> {
    return this._http.get(this.api + 'albums/getAll?pageNo=0&sort=1&itemsPerPage=2');
  }

  createAlbum(albumName: string): Observable<any> {
    return this._http.get(this.api + 'albums/create-album/' + albumName);
  }

  renameAlbum(album: AlbumContainer): Observable<any> {
    return this._http.post(this.api + 'albums/rename-album', album);
  }

  getAlbumImages(albumName: string | undefined): Observable<any> {
    return this._http.get(this.api + 'albums/get-images?albumName=' + albumName);
  }

  addImagesToAlbum(images: ImageContainer[], albumName: string) {
    let ids: string[] = [];
    images.forEach(item => ids.push(item.id));
    return this._http.post(this.api + 'albums/add-images-to-album?albumName='+albumName, ids);
  }

  deleteAlbum(album: AlbumContainer) {
    return this._http.delete(this.api + 'albums/delete-album/' + album.albumName);
  }
}
