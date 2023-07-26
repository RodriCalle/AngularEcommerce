import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './demo.component';

const routes: Routes = [
  {
    path: '',
    component : DemoComponent,
    children: [
      {
        path: 'controles',
        loadChildren: () => import('./pages/controles/controles.module').then(m => m.ControlesModule),
      },
      {
        path: 'shared',
        loadChildren: () => import('./pages/shared/shared.module').then(m => m.SharedModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
