import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImageContainer, ImageHolder } from '../models/image';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  api = environment.api + 'images';
  availableImages: ImageContainer[] = [];
  selectedImage!: ImageContainer;

  private uploadedImageSource = new Subject<ImageHolder[]>();
  $uploadedImage = this.uploadedImageSource.asObservable();

  constructor(private http: HttpClient,
    private appService: AppService) {}

  uploadImages(files: Set<File>): Observable<any> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    formData.append('userId', String(this.appService.user.id));
    return this.http.post(this.api + '/upload', formData);
  }

  setUploadedImage(images: ImageHolder[]) {
    this.uploadedImageSource.next(images);
  }

  // getImage(imageId: string): Observable<any>  {
  //   return this.http.get(this.api + '/downloadImage/' + imageId, {responseType: 'arraybuffer'}).pipe(map(data => {
  //     let TYPED_ARRAY = new Uint8Array(data);
  //     const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
  //       return data + String.fromCharCode(byte);
  //     }, '');
  //     let base64String = btoa(STRING_CHAR);
  //     return 'data:image/jpg;base64, ' + base64String;
  //   }));
  // }

  getAvailableImages(albumName: string | undefined = undefined): Observable<any> {
    return this.http.get(this.api + '/getAll?userId=1&pageNo=1&sort=1&itemsPerPage=10&albumName=' + albumName);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(this.api + '/delete/' + imageId);
  }

  moveToTrash(imageId: string): Observable<any> {
    return this.http.delete(this.api + '/move-trash/' + imageId);
  }

  restoreImage(imageId: string): Observable<any> {
    return this.http.get(this.api + '/restore-image/' + imageId);
  }

  getImagesFromTrash(): Observable<any> {
    return this.http.get(this.api + '/from-trash?userId=1&pageNo=1&sort=1&itemsPerPage=10');
  }

  setFavorite(imageId: string, favorite: boolean) {
    return this.http.get(this.api + '/set-favorite/' + imageId + '?favorite=' + favorite);
  }

  getFavoriteImages(): Observable<any> {
    return this.http.get(this.api + '/get-favorite-images?pageNo=1&sort=1&itemsPerPage=10');
  }

  replaceImage(formData: FormData): Observable<void> {
    return this.http.post<void>(this.api + '/edit-image', formData);
  }

}
