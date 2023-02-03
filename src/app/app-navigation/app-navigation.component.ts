import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { AppService } from '../services/app.service';
import { User } from '../models/user';
import { ActivatedRoute, NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { CreateAlbumDialogComponent } from '../create-album-dialog/create-album-dialog.component';
import { NavigationService } from '../services/navigation.service';
import { ImageSelectionDialogComponent } from '../image-selection-dialog/image-selection-dialog.component';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-navigation',
  templateUrl: './app-navigation.component.html',
  styleUrls: ['./app-navigation.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavigationComponent implements OnInit {

  @ViewChild('albumsActive') albumsActive: RouterLinkActive | undefined;
  showBtn$: Observable<boolean>;
  unSubscriber = new UnSubscriber();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => {
        return result.matches
      }),
      shareReplay()
    );

  isMediumDevice$1: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
  .pipe(
    map(result => {
      return result.matches
    }),
    shareReplay()
  );

  userDetails: User;
  albumName!: string;

  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private appService: AppService,
    private router: Router,
    private navigationService: NavigationService,
    private route: ActivatedRoute) {

      this.userDetails = this.appService.user;
      this.showBtn$ = this.navigationService.showBtn$;
    }

  ngOnInit() {
    this.unSubscriber.subs = this.route.queryParams.subscribe(params => {
      console.log(params);
      this.navigationService.showBtn(params['showBtn']);
      this.albumName = params['albumName'];
    });
  }

  public openUploadDialog() {
    this.dialog.open(UploadDialogComponent);
  }

  openCreateAlbumDialog() {
    this.dialog.open(CreateAlbumDialogComponent);
  }

  addImagesToAlbum() {
    this.dialog.open(ImageSelectionDialogComponent, {data: {albumName: this.albumName}});
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }
}
