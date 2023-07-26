import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlesComponent } from './controles.component';

const routes: Routes = [
  {
    path: '',
    component: ControlesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlesRoutingModule { }
