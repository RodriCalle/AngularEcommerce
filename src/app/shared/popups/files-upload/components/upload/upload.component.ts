import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import firebase from 'firebase/app';
import { Observable, Subject, finalize, lastValueFrom, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file!: File;
  @Output() completed = new EventEmitter<string>();

  task!: AngularFireUploadTask;
  percentage$!: Observable<number>;
  snapshot$!: Observable<firebase.storage.UploadTaskSnapshot>;

  downloadUrl!: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;
    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage$ = this.task.percentageChanges() as Observable<number>;
    this.snapshot$ = this.task.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;

    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async () => {
        const storageRef$ = storageRef.getDownloadURL();
        this.downloadUrl = await lastValueFrom(storageRef$);
        this.completed.next(this.downloadUrl);
      })
    ).subscribe();
  }

}
