import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoadingIn() {
    return this.isLoading.asObservable();
  }

  startLoading() {
    this.isLoading.next(true);
  }

  stopLoading() {
    this.isLoading.next(false);
  }

  constructor(
    private router: Router
  ) {}

  login() {
    this.loggedIn.next(true);
    this.router.navigate(['/app']);
  }

  setLoginCompleted() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
