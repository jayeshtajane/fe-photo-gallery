import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterComponent } from './register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageContainerComponent } from './image-container/image-container.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
import { AppImageViewverComponent } from './app-image-viewver/app-image-viewver.component';
import { AlbumComponent } from './album/album.component';
import { CreateAlbumDialogComponent } from './create-album-dialog/create-album-dialog.component';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { ImageSelectionDialogComponent } from './image-selection-dialog/image-selection-dialog.component';
import { NoMediaComponent } from './no-media/no-media.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { TrashComponent } from './trash/trash.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { ExploreComponent } from './explore/explore.component';
import { ExploreCategoryComponent } from './explore-category/explore-category.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    UploadDialogComponent,
    LoginComponent,
    RegisterComponent,
    ImageContainerComponent,
    AppImageViewverComponent,
    AlbumComponent,
    CreateAlbumDialogComponent,
    AlbumViewerComponent,
    ImageSelectionDialogComponent,
    NoMediaComponent,
    SafeUrlPipe,
    ComingSoonComponent,
    TrashComponent,
    FavoriteComponent,
    ImageEditorComponent,
    ExploreComponent,
    ExploreCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    HttpClientModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    NgxImageGalleryModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
