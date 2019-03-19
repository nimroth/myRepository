import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class AppComponent implements OnInit {

  title = 'dashboard';

  // constructor(private router: Router) {
  //   router.events.subscribe((event) => {
  //     console.log('event = ', event);
  //     if (event instanceof NavigationEnd) {
  //       if (event.url === '/dashboard') {
  //         this.title = 'Dashboard';
  //       }
  //     }
  //   });
  // }

  ngOnInit() {

  }
}
