import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlbumContainer } from '../models/album';
import { AlbumService } from '../services/album.service';
import { ExploreService } from '../services/explore.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  availableThings: AlbumContainer[] = [];
  unSubscriber = new UnSubscriber();

  constructor(private exploreService: ExploreService,
    private router: Router,
    public dialog: MatDialog,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAvailableThings();
  }

  getAvailableThings() {
    this.unSubscriber.subs = this.exploreService.getAvailableThings().subscribe(data => {
      this.availableThings = data.listData;
      console.log(this.availableThings);
    });
  }

  openCategory(category: string) {
    this.router.navigate(['/app/explore/category'], { queryParams: {showBtn: true, category: category}});
  }

}
