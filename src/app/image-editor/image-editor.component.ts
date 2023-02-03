import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import ImageEditor from 'tui-image-editor';
import { ImageContainer } from '../models/image';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageEditorComponent implements OnInit {

  editor!: ImageEditor;
  image!: ImageContainer;

  constructor(private renderer: Renderer2,
    private imageService: ImageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(this.imageService.selectedImage === undefined) {
      this.router.navigate(['/']);
      return;
    }
    this.image = this.imageService.selectedImage;
    this.openEditor();
  }

  openEditor() {
    this.editor = new ImageEditor(document.querySelector('#tui-image-editor') as HTMLElement, {
      includeUI: {
        loadImage: {
          path: this.image.url,
          name: this.image.originalFilename,
        },
        menuBarPosition: 'bottom',
      },
      cssMaxWidth: 700,
      cssMaxHeight: 1000,
      selectionStyle: {
        cornerSize: 20,
        rotatingPointOffset: 70,
      },
    });

    this.addSaveHandler();
  }

  addSaveHandler() {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'id', 'save-img-button');
    this.renderer.setAttribute(button, 'image-name', this.image.originalFilename);
    this.renderer.setAttribute(button, 'image-id', this.image.id);
    const text = this.renderer.createText('Save');
    this.renderer.listen(button, 'click', this.save.bind(this))
    this.renderer.appendChild(button, text);
    this.renderer.appendChild(document.querySelector('.tui-image-editor-header-buttons'), button);
  }

  save(event: PointerEvent) {
    console.log(event);
    const canvas = document.querySelector('.lower-canvas') as HTMLCanvasElement;
    const imageData = canvas.toDataURL('image/jpeg');
    const formData = this.toFile(imageData);
    this.imageService.replaceImage(formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  toFile(imgBase64: string) {
    const file = this.dataURIToBlob(imgBase64)
    const formData = new FormData();
    formData.append('file', file, this.image.originalFilename)
    formData.append('id', this.image.id);
    formData.append('imageName', this.image.originalFilename);
    return formData;
  }

  dataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }

}
