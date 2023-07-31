import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type PasswordType = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = '';
  @Output() changed = new EventEmitter<string>();
  
  value: string = '';
  isDisabled: boolean = false;
  passwordType: PasswordType;

  constructor() { 
    this.passwordType = 'password';
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
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onKeyUp(obj: any): void {
    this.value = obj.target.value;
    this.propagateChange(this.value);
    this.changed.emit(this.value);
  }

  onBlur(): void {
    this.propagateTouch();
  }

  tooglePasswordType(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  
}
