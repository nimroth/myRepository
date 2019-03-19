import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthService } from '../../../shared/service/auth/auth.service';
// import { WebService } from '../../../shared/service/webservice/web.service';
// import { environment } from '/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './template.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    // private authService: AuthService,
    // private webService: WebService
  ) { }

  title = 'Sign In';
  hide = true;
  // API_URL = environment.apiUrl;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    console.log('value = ', this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.router.navigate(['/dashboard']);
    }
    // this.authService.startLoading();
    // this.webService.postRequest('/carevisor/login' , request , null).subscribe((data) => {
    //   const loginRes = JSON.parse(JSON.stringify(data));
    //   if (loginRes.status === 'success' || loginRes.status === 2000) {
    //     this.res = JSON.parse(JSON.stringify(data));
    //     this.router.navigate(['/dashboard']);
    //   } else {
    //     // this.errorMsg = loginRes.message;
    //     this.authService.stopLoading();
    //   }
    //     });
    // }
  }
  ngOnInit() {
  }

}
