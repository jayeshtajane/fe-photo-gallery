import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageContainer } from '../models/image';
import { ImageService } from '../services/image.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  availableImages: ImageContainer[] = [];
  unSubscriber = new UnSubscriber();

  constructor(private imageService: ImageService,
    private router: Router) { }

  ngOnInit(): void {
    this.imageService.availableImages = this.availableImages;
    this.getFavoriteImages();
  }

  getFavoriteImages() {
    this.unSubscriber.subs = this.imageService.getFavoriteImages().subscribe(data => {
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

  setFavorite(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.unSubscriber.subs = this.imageService.setFavorite(image.id, !image.favorite).subscribe(data => {
      image.favorite = !image.favorite;
      this.availableImages.splice(index, 1);
    });
  }

  moveToTrash(image: ImageContainer, index: number, event: Event) {
    event.preventDefault();
    console.log(image);
    this.unSubscriber.subs = this.imageService.moveToTrash(image.id).subscribe(data => {
      console.log('image deleted');
      this.availableImages.splice(index, 1);
    });
  }

}
