import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name : [''],
    });
  }

  onPatchValue(){
    this.form.patchValue({
      name : 'John Doe',
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

}
