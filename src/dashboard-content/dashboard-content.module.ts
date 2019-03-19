import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardContentComponent } from './component/dashboard-content/component';

import { DashboardContentRoutingModule } from './routing.module';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DashboardContentComponent],
  imports: [
    CommonModule,
    DashboardContentRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class DashboardContentModule { }
