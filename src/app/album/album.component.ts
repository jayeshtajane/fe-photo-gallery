import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAlbumDialogComponent } from '../create-album-dialog/create-album-dialog.component';
import { AlbumContainer } from '../models/album';
import { AlbumService } from '../services/album.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  availableAlbums: AlbumContainer[] = [];
  unSubscriber = new UnSubscriber();

  constructor(private albumService: AlbumService,
    private router: Router,
    public dialog: MatDialog,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAvailableAlbums();
  }

  getAvailableAlbums() {
    this.unSubscriber.subs = this.albumService.getAvailableAlbums().subscribe(data => {
      this.availableAlbums = data.listData;
      console.log(this.availableAlbums);
    });
  }

  openAlbum(albumName: string) {
    this.router.navigate(['/app/albums/view-album'], { queryParams: {showBtn: true, albumName: albumName}});
  }

  deleteAlbum(album: AlbumContainer) {
    this.albumService.deleteAlbum(album).subscribe(data => {
      this.toastService.openSnackBar('Album deleted.');
      this.getAvailableAlbums();
    });
  }

  editAlbumName(album: AlbumContainer) {
    let ref = this.dialog.open(CreateAlbumDialogComponent, {data: {id: album.id, albumName: album.albumName}});
    ref.afterClosed().subscribe(data => {
      this.getAvailableAlbums();
    });
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }

}
