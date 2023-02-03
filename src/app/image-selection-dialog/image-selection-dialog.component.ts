import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageContainer } from '../models/image';
import { AlbumService } from '../services/album.service';
import { ImageService } from '../services/image.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-image-selection-dialog',
  templateUrl: './image-selection-dialog.component.html',
  styleUrls: ['./image-selection-dialog.component.css']
})
export class ImageSelectionDialogComponent implements OnInit, OnDestroy {

  uploadedImages: ImageContainer[] = [];
  availableImages: ImageContainer[] = [];
  selectedImages: ImageContainer[] = [];
  albumName!: string;
  unSubscriber = new UnSubscriber();

  constructor(private imageService: ImageService,
    private albumService: AlbumService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<ImageSelectionDialogComponent>) {
      console.log(data);
      this.albumName = data.albumName;
    }

  ngOnInit(): void {
    this.getAvailableImages();
  }

  getAvailableImages() {
    this.unSubscriber.subs = this.imageService.getAvailableImages().subscribe(data => {
      console.log(this.availableImages);
      this.availableImages = data.listData;
      this.imageService.availableImages = this.availableImages;
      console.log(this.imageService.availableImages);
    });
  }

  addImagesToAlbum() {
    console.log(this.selectedImages);
    this.unSubscriber.subs = this.albumService.addImagesToAlbum(this.selectedImages, this.albumName).subscribe(data => {
      console.log(data);
      this.toastService.openSnackBar('Images uploaded');
      this.imageService.setUploadedImage(this.selectedImages);
      this.dialogRef.close(data);
    });
  }

  selectImage(image: ImageContainer) {
    console.log(image);
    let index = this.selectedImages.findIndex(item => item.id === image.id);
    if(index >= 0) {
      this.selectedImages.splice(index, 1);
      let index2 = this.availableImages.findIndex(item => item.id === image.id);
      this.availableImages[index2].selectionImage = undefined;
    }
    else {
      this.selectedImages.push(image);
      let index2 = this.availableImages.findIndex(item => item.id === image.id);
      this.availableImages[index2].selectionImage = 'assets/images/select-image.png';
    }
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }
}
