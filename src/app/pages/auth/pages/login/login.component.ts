import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, regexErrors} from '@app/shared';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Store, select } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  
  form!: FormGroup;
  loading$!: Observable<boolean |null>;

  regexErrors = regexErrors;

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    
    this.loading$ = this.store.pipe(select(fromUser.getLoading));

    this.form = this.fb.group({
      email: ['',{
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(regex.email)],
      }],
      password: ['', {
        updateOn: 'change',
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(regex.password),
        ],
      }]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      
      const credentials : fromUser.EmailPasswordCredentials = {
        email,
        password,
      }

      this.store.dispatch(new fromUser.SignIn(credentials));
    } else {
      this.form.markAllAsTouched();
    }
  }

}
