import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/component';

const routes: Routes = [
{
  path: '',
  component: DashboardComponent,
  children: [
    {
      path: '',
      loadChildren: 'src/dashboard-content/dashboard-content.module#DashboardContentModule'
    },
    {
      path: 'reports',
      loadChildren: 'src/reports/reports.module#ReportsModule'
   }
  ]
},
// {
//    path: 'reports',
//    loadChildren: 'src/reports/reports.module#ReportsModule'
// },
{
  path: '',
  redirectTo: 'dashboard-content',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
