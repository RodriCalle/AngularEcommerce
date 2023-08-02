import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem, Value } from '@app/models/frontend';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true,
    },
  ],
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
  
  @Input() items!: ControlItem[];
  @Output() changed = new EventEmitter<Value[]>();

  value!: Value[];
  isDisabled: boolean = false;

  constructor() {}

  private propagateChange: any = () => {};
  private propagateTouch: any = () => {};

  ngOnInit(): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  isChecked(value: Value): boolean {
    return this.value && this.value.includes(value);
  }

  onChange(event: Event, value: Value): void {
    const target = event.target as HTMLInputElement;
    const selected = this.getSelected(value, target.checked);

    this.value = selected;
    
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  private getSelected(value: Value, checked: boolean): Value[] {
    const selected: Value[] = this.value ? [...this.value] : [];
    if (checked) {
      if(!selected.includes(value))
        selected.push(value);
    } else {
      const index = selected.indexOf(value);
      if (index > -1) {
        selected.splice(index, 1);
      }
    }

    return selected.length ? selected : [];
  }
}
