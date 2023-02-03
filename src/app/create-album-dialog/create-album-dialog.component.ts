import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlbumContainer } from '../models/album';
import { AlbumService } from '../services/album.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-create-album-dialog',
  templateUrl: './create-album-dialog.component.html',
  styleUrls: ['./create-album-dialog.component.css']
})
export class CreateAlbumDialogComponent implements OnInit {

  albumName: string = '';
  albumId: string = '';
  rename = false;
  album: AlbumContainer;
  unSubscriber = new UnSubscriber();

  constructor(private dialogRef: MatDialogRef<CreateAlbumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private albumService: AlbumService,
    private toastService: ToastService,
    private router: Router) {
      this.album = data;
      if(data) {
        this.albumName = data.albumName;
        this.albumId = data.albumId;
        this.rename = true;
      }
    }

  ngOnInit(): void {}

  createAlbum() {
    this.unSubscriber.subs = this.albumService.createAlbum(this.albumName).subscribe(data => {
      if(data.statusCode !== 500) {
        this.toastService.openSnackBar(data.message);
        this.router.navigate(['/app/albums/view-album'], { queryParams: {showBtn: true, albumName: this.albumName}});
        this.dialogRef.close(data);
      }
      else {
        this.toastService.openSnackBar(data.message);
      }
    });
  }

  renameAlbum() {
    this.album.albumName = this.albumName;
    this.unSubscriber.subs = this.albumService.renameAlbum(this.album).subscribe(data => {
      if(data.statusCode !== 500) {
        this.toastService.openSnackBar(data.message);
        this.dialogRef.close(this.album);
      }
      else {
        this.toastService.openSnackBar(data.message);
      }
    });
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }
}
