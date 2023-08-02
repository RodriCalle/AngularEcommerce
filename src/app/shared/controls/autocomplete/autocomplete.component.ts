import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { Observable, Subject, distinctUntilChanged, filter, map, startWith, takeUntil } from 'rxjs';



@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() items!: ControlItem[];
  @Input() placeholder!: string;

  @Output() changed = new EventEmitter<ControlItem>();

  formControl = new FormControl();

  options$!: Observable<ControlItem[]>;

  private destroy = new Subject<any>();

  constructor() { }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.options$ = this.formControl.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value === 'string' || value === 'object'),
      map(value => typeof value === 'string' ? value : value.label),
      map(label => label ? this.filter(label) : this.items.slice())
    );

    this.formControl.valueChanges.pipe(
      takeUntil(this.destroy),
      distinctUntilChanged()
    ).subscribe(item => {
      const value = typeof item === 'object' ? item.value : null;
      this.propagateChange(value);
      this.changed.emit(value);
    }
    );
  }

  filter(label: string): any {
    const filterValue = label.toLowerCase();
    return this.items.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  private propagateChange: any = () => {};
  private propagateTouch: any = () => {};

  writeValue(obj: any): void {
    const selectedOption = this.items.find(item => item.value === obj);
    this.formControl.setValue(selectedOption);
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    }
    else {
      this.formControl.enable();
    }
  }

  displayFn(item: ControlItem): string {
    return item && item.label ? item.label : '';
  }

  onBlur(): void {
    this.propagateTouch();
  }

}
