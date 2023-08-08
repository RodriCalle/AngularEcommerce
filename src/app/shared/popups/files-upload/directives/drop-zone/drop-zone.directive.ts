import { Directive, EventEmitter, Host, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  constructor() { }

  // soltar || dejar caer
  @HostListener('drop', ['$event']) onDrop($event: any) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  // arrastrar
  @HostListener('dragover', ['$event']) onDragOver($event: any) {
    $event.preventDefault();
    this.hovered.emit(true);
  }

  // salir del modo de arrastrar
  @HostListener('dragleave', ['$event']) onDragLeave($event: any) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

}
