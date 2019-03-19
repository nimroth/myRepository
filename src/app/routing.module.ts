import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/login/login.module#LoginModule',
  },
  {
    path: 'dashboard',
    loadChildren: 'src/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '',
    pathMatch: 'full' ,
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
