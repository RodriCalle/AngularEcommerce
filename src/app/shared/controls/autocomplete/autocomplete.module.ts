import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AutocompleteComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule { }
