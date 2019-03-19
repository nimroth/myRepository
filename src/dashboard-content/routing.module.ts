import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContentComponent } from './component/dashboard-content/component';

const routes: Routes = [{
  path: '',
  component: DashboardContentComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardContentRoutingModule { }
