import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from './services/auth.service';
import { isAuthenticated, saveAuthentication } from './utility/authManager';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  timesRun: number = 0;
  isLoginPhase  = true;
  isLoading     = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {

    // check User Authenticated or not
    let isAuthorized = isAuthenticated();

    if (isAuthorized) {
      window.alert("You are already login..!!");
      this.router.navigate(['/recipes']);
    }

  }

  ngOnInit(): void {
    this.intervalMessage();
  }

  onSwitchTab() {
    this.isLoginPhase = !this.isLoginPhase;
  }

  onFormSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email    = form.value.email;
    const password = form.value.password;
    
    let authObject = new Observable<AuthResponse>();  // make object Observable
    
    this.isLoading = true;
    if (this.isLoginPhase) {
      authObject = this.authService.login(email, password);
    } else {
      authObject =this.authService.signUp(email, password);
    }

    // make a single Subject() entrie these component
    authObject.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        localStorage.setItem('token', response.idToken);
        saveAuthentication(response);
        this.router.navigate(['/recipes']);  // redirect to recipes if success login
        this.error = '';
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      })

    form.reset();
  }

  // Check Interval Function calling..
  intervalMessage() {
    this.timesRun += 1;
    let interval = setInterval(() => {

      if (this.timesRun == 3) {
        clearInterval(interval);
        return;
      }
      console.log('counter', this.timesRun );
      this.timesRun++;
      console.log("Display message after 3 second");
    }, 3000);
  }

}
