import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb : FormBuilder) { }

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
