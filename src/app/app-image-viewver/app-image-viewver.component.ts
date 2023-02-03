import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';
import { ImageContainer } from '../models/image';
import { ImageService } from '../services/image.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-image-viewver',
  templateUrl: './app-image-viewver.component.html',
  styleUrls: ['./app-image-viewver.component.css']
})
export class AppImageViewverComponent implements OnInit, AfterViewInit {

  @ViewChild(NgxImageGalleryComponent) ngxImageGallery!: NgxImageGalleryComponent;

  conf: GALLERY_CONF = {
    showDeleteControl: true,
    showImageTitle: true,
    imageBorderRadius: '0px',
    backdropColor: '#000',
  };

  images: GALLERY_IMAGE[] = []
  availableImage: ImageContainer[] = [];
  imageIndex: number = 0;
  @Input('forTrash') forTrash: boolean = false;

  constructor(private imageService: ImageService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private changeDetector:ChangeDetectorRef,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.imageIndex = Number(this.route.snapshot.paramMap.get("id"));
    this.availableImage = this.imageService.availableImages;
    if(this.availableImage === undefined || this.availableImage.length === 0) {
      this.router.navigate(['/']);
    }
    this.images = [];
    this.availableImage.forEach(image => {
      this.images.push({
        url: image.url,
        thumbnailUrl: image.url
      });
    });

    this.route.queryParams.subscribe(data => {
      this.forTrash = data.forTrash;
    });
  }

  ngAfterViewInit() {
    this.openGallery(this.imageIndex);
    this.changeDetector.detectChanges();
  }

  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }

  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }

  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }

  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }

  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }

  /**************************************************/

  // EVENTS
  // callback on gallery opened
  galleryOpened(index: number) {
    console.info('Gallery opened at index ', index);
  }

  // callback on gallery closed
  galleryClosed() {
    this._location.back();
    console.info('Gallery closed.');
  }

  // callback on gallery image clicked
  galleryImageClicked(index: number) {
    console.info('Gallery image clicked with index ', index);
  }

  // callback on gallery image changed
  galleryImageChanged(index: number) {
    console.info('Gallery image changed to index ', index);
  }

  // callback on user clicked delete button
  deleteImage(index: number) {
    console.info('Delete image at index ', index);
    if(this.forTrash) {
      this.imageService.deleteImage(this.availableImage[index].id).subscribe(data => {
        this.toastService.openSnackBar('Image deleted.');
        this.availableImage.splice(index, 1);
        this.ngxImageGallery.close();
      });
    }
    else {
      this.imageService.moveToTrash(this.availableImage[index].id).subscribe(data => {
        this.toastService.openSnackBar('Image deleted.');
        this.availableImage.splice(index, 1);
        this.ngxImageGallery.close();
      });
    }
  }
}
