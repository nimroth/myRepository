import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  option: string;
  option1 = 'Dashboard';
  option2 = 'Reports';

  onSelect(option: string) {
    if (option === this.option1) {
      this.router.navigate(['/dashboard']);
    }
    if (option === this.option2) {
      this.router.navigate(['dashboard/reports']);
    }
  }

  ngOnInit() {
  }

}
