import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataUrlToFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() imageFile!: File;
  @Output() changed = new EventEmitter<File>();

  croppedImage!: string;

  constructor() { }

  ngOnInit(): void {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64!;
  }

  onCrop(): void {
    const file = dataUrlToFile(this.croppedImage, this.imageFile);
    this.changed.emit(file);
  }

}
