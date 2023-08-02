import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

type Value = number;

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder!: string;
  @Input() min!: Date;
  @Input() max!: Date;

  @Output() changed = new EventEmitter<Value>();

  get inputValue(): Date {
    return this.value ? new Date(this.value) : new Date();
  }


  value!: Value;
  isDisabled!: boolean;

  constructor() { }
  
  ngOnInit(): void {
  }

  private propagateChange: any = () => {};
  private propagateTouch: any = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChange(event: MatDatepickerInputEvent<Date>) {
    this.value = event.value?.getTime() || new Date().getTime();
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onClose() {
    this.propagateTouch();
  }

}
