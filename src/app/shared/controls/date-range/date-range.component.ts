import { Component, EventEmitter, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Value {
  start: number;
  end: number;
}

export interface Placeholder {
  start: string;
  end: string;
}

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder!: Placeholder;
  @Input() changed = new EventEmitter<Value>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  private propagateChange: any = () => {};
  private propagateTouch: any = () => {};

  ngOnInit(): void {
    this.form = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  get min(): Date {
    const start = this.form.controls.start.value;
    return start ? new Date(start) : new Date();
  }

  get max(): Date {
    const end = this.form.controls.end.value;
    return end ? new Date(end) : new Date();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.patchValue(obj || {});
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
    this.form.valueChanges.subscribe((value: Value) => {
      this.propagateChange(value);
      this.changed.emit(value);
    });
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  onChange(): void {
    const value = { ...this.form.value };
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onClose(): void {
    this.propagateTouch();
  }

}
