import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  multiple: boolean;
  crop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {

  isHovering!: boolean;
  files : File[] = [];
  imageFile!: File | null;
  isError!: boolean;

  filesUrls : string[] = [];

  constructor(
    private dialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    this.dropGeneral(files);
  }

  onDropFile(event: Event | any) {
    this.dropGeneral(event.target.files);
  }

  dropGeneral(files: FileList) {
    this.isError = false;
    
    if (this.data.crop && files.length > 1) {
      this.isError = true;
      return;
    }

    if (this.data.crop && files.length === 1 && files[0].type.split('/')[0] === 'image') {
      this.imageFile = files.item(0) as File;
      return;
    }

    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }

    console.log(files);
  }

  onUploadComplete(url: string) {
    this.filesUrls.push(url);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onComplete(): void {
    const res = this.data.multiple ? this.filesUrls : this.filesUrls[0];
    this.dialogRef.close(res);
  }

  onCrop(file: File) {
    this.imageFile = null;
    this.files.push(file);
  }
    
}
