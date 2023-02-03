import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageContainer } from '../models/image';
import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit, OnDestroy {

  uploadedImages: ImageContainer[] = [];
  availableImages: ImageContainer[] = [];
  albumName: string | undefined;
  unSubscriber = new UnSubscriber();

  constructor(private albumService: AlbumService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,) { }

  ngOnInit(): void {
    this.unSubscriber.subs = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.albumName = params['albumName'];

      this.availableImages = [];
      this.imageService.availableImages = this.availableImages;
      this.unSubscriber.subs = this.imageService.$uploadedImage.subscribe((data: any) => {
        this.uploadedImages = data;
        this.availableImages = this.uploadedImages.concat(this.availableImages);
        this.imageService.availableImages = this.availableImages;
      });

    });
    this.getAlbumImages();
  }

  getAlbumImages() {
    this.unSubscriber.subs = this.albumService.getAlbumImages(this.albumName).subscribe(data => {
      console.log(this.availableImages);
      this.availableImages = data;
      console.log(this.availableImages);
      this.imageService.availableImages = this.availableImages;
    });
  }

  openImage(id: number = 0) {
    this.router.navigate(['/image-viewer', id]);
  }

  ngOnDestroy() {
    console.log("unsubscribed");
    this.unSubscriber.unsubscribe();
  }

}
