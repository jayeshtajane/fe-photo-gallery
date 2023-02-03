import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ImageService } from '../services/image.service';
import { ToastService } from '../services/toast.service';
import { UnSubscriber } from '../utils/unsubscriber';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  @ViewChild('file') file: any;
  enableUploadBtn = false;
  unSubscriber = new UnSubscriber();

  public files: Set<File> = new Set()

  constructor(private dialogRef: MatDialogRef<UploadDialogComponent>,
    private imageService: ImageService,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
  }

  uploadFiles() {
    this.unSubscriber.subs = this.imageService.uploadImages(this.files).subscribe(data => {
      this.toastService.openSnackBar('Images uploaded');
      this.imageService.setUploadedImage(data);
      this.dialogRef.close(data);
    });
  }

  removeFile(file: File) {
    this.files.delete(file);
  }

  ngOnDestroy() {
    this.unSubscriber.unsubscribe();
  }
}
