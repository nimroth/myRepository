import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
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
    public datepipe: DatePipe
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
    let dat = '';
    this.checkedValue.forEach(data => {
      dat += `${data},`;
    });
    console.log('dat = ', dat );
    if (this.dateValue.valid) {
      // const fromDateVal = new Date(this.dateValue.value.fromDate).getDate();
      // const fromMonthVal = new Date(this.dateValue.value.fromDate).getMonth();
      // const fromYearVal = new Date(this.dateValue.value.fromDate).getFullYear();
      // const fromDateFormat = fromDateVal + fromMonthVal + fromYearVal;
      // const toDateVal = new Date(this.dateValue.value.fromDate).getDate();
      // const toMonthVal = new Date(this.dateValue.value.fromDate).getMonth();
      // const toYyearVal = new Date(this.dateValue.value.fromDate).getFullYear();
      // const fromDateVal = dateVal + monthVal + yearVal;
      // const fromDateVal = this.dateValue.value.fromDate | date: format;
      // this.dateValue.value.fromDate = new Date();
      const fromDateVa = this.datepipe.transform(this.dateValue.value.fromDate, 'yyyy-MM-dd');
      const toDateVa = this.datepipe.transform(this.dateValue.value.toDate, 'yyyy-MM-dd');
      console.log('date = ', fromDateVa);
      this.webService.getRequest('/' + fromDateVa + '/' + toDateVa + '/' + dat, null)
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
              console.log('payload project= ', data.payload.reportperproject);
              console.log('payload User= ', data.payload.reportperuser);
              // this.dataSource = data.payload;
            }
          }
        });
    } else {
      // this.dataSource = ELEMENT_DATA;
      // this.showProjectList = true;
    }
  }
}
