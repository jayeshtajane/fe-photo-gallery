import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageContainer } from '../models/image';
import { ExploreService } from '../services/explore.service';
import { ImageService } from '../services/image.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-explore-category',
  templateUrl: './explore-category.component.html',
  styleUrls: ['./explore-category.component.css']
})
export class ExploreCategoryComponent implements OnInit {

  unSubscriber = new UnSubscriber();
  searchText = '';
  availableImages: ImageContainer[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exploreService: ExploreService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.unSubscriber.subs = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.searchText = params['category'];
      console.log('qury - ' + this.searchText);
      this.search();
    });
  }

  search() {
    this.unSubscriber.subs = this.exploreService.search(this.searchText).subscribe((data: any) => {
      this.availableImages = data.listData;
    });
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

  openImage(id: number = 0) {
    this.router.navigate(['/image-viewer', id]);
  }

}
