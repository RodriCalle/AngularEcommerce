import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services/notification/notification.service';
import { regex, regexErrors } from '@app/shared/utils';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  form!: FormGroup;
  isInline: boolean = true;
  regexErrors = regexErrors;

  items!: ControlItem[];
  showSpinner: boolean = false;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.items = [
      { label: 'Item 1', value: 1 },
      { label: 'Item 2', value: 2 },
      { label: 'Item 3', value: 3 },
      { label: 'Item 4', value: 4 },
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(regex.email),
          ],
        },
      ],
      password: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(regex.password),
          ],
        },
      ],
      select: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      checkboxes: [
        [],
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      radios: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      date: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      dateRange: [
        null,
        {
          updateOn: 'change',
          validators: [Validators.required],
        },
      ],
      autocomplete: [
        null,
        {
          updateOn: 'blur',
          validators: [Validators.required],
        },
      ],
    });
  }

  onPatchValue() {
    this.form.patchValue({
      email: 'JohnDoe@gmail.com',
      password: 'Rodrigo34324@.4',
      select: 2,
      autocomplete: 3,
      checkboxes: [1, 2],
      radios: 4,
      date: new Date(),
      dateRange: {
        start: new Date(2022, 5, 10).getTime(),
        end: new Date(2022, 11, 10).getTime(),
      },
    });
  }

  organize() {
    this.isInline = !this.isInline;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }

  onToggleDisabled() {
    this.form.enabled ? this.form.disable() : this.form.enable();
  }

  onError() {
    this.notificationService.error('Se encotraron errores en el proceso.');
  }
  onSuccess() {
    this.notificationService.success('El proceso fue exitoso.');
  }
  onToggleSpinner() {
    this.showSpinner = !this.showSpinner;
  }

  onFilesChanged(urls: string | string[]): void {
    console.log(urls);
  }
}
