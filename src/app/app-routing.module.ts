import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { AlbumComponent } from './album/album.component';
import { AppImageViewverComponent } from './app-image-viewver/app-image-viewver.component';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { AuthGuard } from './guards/auth.guard';
import { ImageContainerComponent } from './image-container/image-container.component';
import { ImageEditorComponent } from './image-editor/image-editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TrashComponent } from './trash/trash.component';
import { ExploreComponent } from './explore/explore.component';
import { ExploreCategoryComponent } from './explore-category/explore-category.component';

const routes: Routes = [
  {
    path: 'app', component: AppNavigationComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'images', component: ImageContainerComponent, canActivate: [AuthGuard]},
      {path: 'albums', component: AlbumComponent, canActivate: [AuthGuard]},
      {path: 'albums/view-album', component: AlbumViewerComponent, canActivate: [AuthGuard]},
      {path: 'favorite', component: FavoriteComponent, canActivate: [AuthGuard]},
      {path: 'trash', component: TrashComponent, canActivate: [AuthGuard]},
      {path: 'explore', component: ExploreComponent, canActivate: [AuthGuard]},
      {path: 'explore/category', component: ExploreCategoryComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'user-form', component: RegisterComponent},
  {path: 'image-viewer/:id', component: AppImageViewverComponent, canActivate: [AuthGuard]},
  {path: 'editor/:id', component: ImageEditorComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'app/images', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
