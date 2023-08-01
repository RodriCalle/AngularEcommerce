import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements OnInit {

  @Input() placeholder!: string;
  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value>();
  
  value!: Value;
  isDisabled: boolean = false;

  constructor() { 
  }

  private propagateChange: any = () => { };
  private propagateTouch: any = () => { };

  ngOnInit(): void {
  }
  
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: MatSelectChange): void {
    this.value = event.value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouch();
  }

    

}
