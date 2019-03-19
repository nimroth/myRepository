import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import {ExcelService} from '../../../shared/service/excel/excel.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { WebService } from '../../../shared/service/webservice/web.service';
import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'url';

export interface PeriodicElement {
  Userid: string;
  projectid: string;
  projectname: string;
  sumvalue: string;
  email: string;
  sumactual: string;
  sumbillable: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {userid: 1, projectid: 'Henry', lastName: 'J', email: 'henry@gmail.com'},
//   {providerId: 2, firstName: 'Calvin', lastName: 'Sten', email: 'sten@gmail.com'},
//   {providerId: 3, firstName: 'Einstein', lastName: 'Joy', email: 'joy@gmail.com'},
//   {providerId: 4, firstName: 'Calbury', lastName: 'Ben', email: 'ben@gmail.com'},
//   {providerId: 5, firstName: 'Steven', lastName: 'Clinton', email: 'clinton@gmail.com'},
//   {providerId: 6, firstName: 'Glan', lastName: 'Mckey', email: 'mckey@gmail.com'},
//   {providerId: 7, firstName: 'Julius', lastName: 'Ashton', email: 'ashton@gmail.com'},
//   {providerId: 8, firstName: 'Maxy', lastName: 'Mark', email: 'mark@gmail.com'},
//   {providerId: 9, firstName: 'Dennis', lastName: 'Jenly', email: 'jenly@gmail.com'},
//   {providerId: 10, firstName: 'Ravel', lastName: 'Adhil', email: 'ravel@gmail.com'},
// ];

@Component({
  selector: 'app-reports',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class ReportsComponent implements OnInit {

  projectDisplayedColumns: string[] = ['projectid', 'projectname', 'sumvalue', 'sumactual', 'sumbillable'];
  userDisplayedColumns: string[] = ['Userid', 'projectid', 'projectname', 'sumvalue', 'email', 'sumactual', 'sumbillable'];
  dataSourceProject: any[] = [];
  dataSourceUser: any[] = [];
  providerRes: any[] = [];
  showProjectList: any;
  showUserList: any;
  dateValue: FormGroup;
  checkedValue = new Set([]);

  orders = [];

  minDate = new Date(2017, 0, 1);
  maxDate = new Date(2019, 0, 1);

  // transform(items: any[], searchText: string): any[] {
  //   if (!items) {
  //     return [];
  //   }
  //   if (!searchText) {
  //     return items;
  //   }
  //   searchText = searchText.toLowerCase();
  //   return items.filter(it => {
  //     return it.name.toLowerCase().includes(searchText);
  //   });
  // }

  constructor(
    private webService: WebService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private excelService: ExcelService
  ) {
    this.dateValue = this.formBuilder.group({
      orders: new FormArray([]),
      projectid: this.orders,
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
    });
    this.addCheckboxes();
  }

  // dateValue = new FormGroup ({
  //   fromDate: new FormControl('', Validators.required),
  //   toDate: new FormControl('', Validators.required)
  // });

  ngOnInit() {
    this.webService.getRequest('/getprojectlist', null)
      .subscribe((data: any) => {
        if (data) {
          if (data.status === 'success') {
            this.orders = data.payload;
            this.addCheckboxes();
          }
        }
      });
  }

  private addCheckboxes() {
    this.orders.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.dateValue.controls.orders as FormArray).push(control);
    });
  }

  getValue(id, event) {
    if (event.checked) {
      this.checkedValue.add(id);
    } else if (!event.checked) {
      this.checkedValue.delete(id);
    }
  }

  submitDate() {
    let chkBoxVal = '';
    this.checkedValue.forEach(data => {
      chkBoxVal += `${data},`;
    });
    if (this.dateValue.valid) {
      const fromDateVal = this.datepipe.transform(this.dateValue.value.fromDate, 'yyyy-MM-dd');
      const toDateVal = this.datepipe.transform(this.dateValue.value.toDate, 'yyyy-MM-dd');
      this.webService.getRequest('/' + fromDateVal + '/' + toDateVal + '/' + chkBoxVal, null)
        // .pipe(map((res: any) => res.json()))
      .subscribe((data: any) => {
        if (data) {
          if (data.status === 'success') {
            if (data.payload.reportperproject) {
              this.dataSourceProject = data.payload.reportperproject;
              this.showProjectList = true;
            }
            if (data.payload.reportperuser) {
              this.dataSourceUser = data.payload.reportperuser;
              this.showUserList = true;
            }
          }
        }
      });
    }
  }

  exportExcel(data) {
    this.excelService.exportAsExcelFile(data, 'data');
  }
}
