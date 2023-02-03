import { SafeUrl } from "@angular/platform-browser";
import { User } from "./user";

export class ImageHolder {
  id: string = '';
  originalFilename: string = '';
  type: string = '';
  bytes: number = -1;
  favorite: boolean = false;
  url: string = '';
}

export class ImageContainer extends ImageHolder {
  selectionImage?: string;
}
