import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlesRoutingModule } from './controles-routing.module';
import { ControlesComponent } from './controles.component';


@NgModule({
  declarations: [
    ControlesComponent
  ],
  imports: [
    CommonModule,
    ControlesRoutingModule
  ]
})
export class ControlesModule { }
