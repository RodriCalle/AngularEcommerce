import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { regex, regexErrors } from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline: boolean = true;
  regexErrors = regexErrors;

  items!: ControlItem[];

  constructor(private fb : FormBuilder) {
    this.items = [
      { label: 'Item 1', value: 1, },
      { label: 'Item 2', value: 2, },
      { label: 'Item 3', value: 3, },
      { label: 'Item 4', value: 4, },
    ];
   }

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.email),
        ],
      }],
      password : ['', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(regex.password),
        ],
      }],
      select : [null, {
        updateOn: 'change',
        validators: [
          Validators.required,
        ],
      }],
    });
  }

  onPatchValue(){
    this.form.patchValue({
      name : 'John Doe',
    });
  }

  organize() {
    this.isInline = !this.isInline;
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
