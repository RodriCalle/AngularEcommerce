import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiosComponent),
      multi: true,
    },
  ],
})
export class RadiosComponent implements OnInit, ControlValueAccessor {

  value!: Value;
  isDisabled: boolean = false;

  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value>();

  constructor() { }

  private propagateChange: any = () => {};

  ngOnInit(): void {
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(value: Value) {
    this.value = value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  isChecked(value: Value): boolean {
    return this.value === value;
  }

}
