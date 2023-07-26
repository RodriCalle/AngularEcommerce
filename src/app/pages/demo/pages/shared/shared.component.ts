import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline: boolean = true;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('[a-zA-Z ]*'),
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
