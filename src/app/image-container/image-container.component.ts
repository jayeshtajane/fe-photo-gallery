import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { of } from 'rxjs';
import { ImageContainer, ImageHolder } from '../models/image';
import { ImageService } from '../services/image.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.css'],
})
export class ImageContainerComponent implements OnInit {

  uploadedImages: ImageContainer[] = [];
  availableImages: ImageContainer[] = [];
  unSubscriber = new UnSubscriber();

  constructor(private imageService: ImageService,
    private router: Router) { }

  ngOnInit(): void {
    this.imageService.availableImages = this.availableImages;
    this.unSubscriber.subs = this.imageService.$uploadedImage.subscribe((data: any) => {
      this.uploadedImages = data;
      this.availableImages = this.uploadedImages.concat(this.availableImages);
      this.imageService.availableImages = this.availableImages;
    });

    this.getAvailableImages();
  }

  getAvailableImages() {
    this.unSubscriber.subs = this.imageService.getAvailableImages().subscribe(data => {
      this.availableImages = data.listData;
      this.imageService.availableImages = this.availableImages;
    });
  }

  openImage(id: number = 0) {
    this.router.navigate(['/image-viewer', id]);
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }

  setFavorite(image: ImageContainer, event: Event) {
    event.preventDefault();
    console.log(image);
    this.imageService.setFavorite(image.id, !image.favorite).subscribe(data => {
      image.favorite = !image.favorite;
    });
  }

  moveToTrash(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.imageService.moveToTrash(image.id).subscribe(data => {
      console.log('image deleted');
      this.availableImages.splice(index, 1);
    });
  }

  editImage(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.imageService.selectedImage = image;
    this.router.navigate(['/editor', image.id]);
  }
}
