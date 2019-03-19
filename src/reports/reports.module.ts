import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './routing.module';
import { WebService } from '../shared/service/webservice/web.service';
import {ExcelService} from '../shared/service/excel/excel.service';
import { ReportsComponent } from './component/reports/component';
import { MatDatepickerModule, MatFormFieldModule, MatCardModule, MatNativeDateModule,
  MatInputModule, MatButtonModule, MatTableModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [ MatDatepickerModule, WebService, ExcelService ]
})
export class ReportsModule { }
