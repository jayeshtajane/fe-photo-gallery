import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageContainer } from '../models/image';
import { ImageService } from '../services/image.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  availableImages: ImageContainer[] = [];
  unSubscriber = new UnSubscriber();

  constructor(private imageService: ImageService,
    private router: Router) { }

  ngOnInit(): void {
    this.imageService.availableImages = this.availableImages;

    this.getImagesFromTrash();
  }

  getImagesFromTrash() {
    this.unSubscriber.subs = this.imageService.getImagesFromTrash().subscribe(data => {
      this.availableImages = data.listData;
      this.imageService.availableImages = this.availableImages;
    });
  }

  openImage(id: number = 0) {
    this.router.navigate(['/image-viewer', id], { queryParams: { forTrash: true } });
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }

  restoreImage(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.imageService.restoreImage(image.id).subscribe(data => {
      console.log('image restored');
      this.availableImages.splice(index, 1);
    });
  }

  deleteImage(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.imageService.deleteImage(image.id).subscribe(data => {
      console.log('image deleted');
      this.availableImages.splice(index, 1);
    });
  }

}
