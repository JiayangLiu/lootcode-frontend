import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from './../services/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  invalidLogin: boolean; 
  email: string = null;
  username: string = null;
  password: string = null;
  subscriptionUser: Subscription;
  user: User = null;

  constructor(
    private router: Router, 
    private authService: AuthService) { }

  // signUp(credentials) {
  //   this.authService.signUp(credentials)
  //     .subscribe(result => { 
  //       if (result)
  //         this.router.navigate(['/']);
  //       else  
  //         this.invalidLogin = true; 
  //     });
  // }
  signUp(form_value) {
    this.email = form_value['email'];
    this.username = form_value['username'];
    this.password = form_value['password'];
    console.log(this.email);
    console.log(this.username);
    console.log(this.password);

    this.subscriptionUser = this.authService.signUp(this.email, this.username, this.password)
    .subscribe(user => {
      if (user.userName != null) {
        console.log(user.userName);
        localStorage.setItem('username', user.userName);
        localStorage.setItem('admin', user.admin? "true" : "false");
        this.router.navigate(['/']);
      } else {
        this.invalidLogin = true;
      }
      // if (localStorage.getItem('token') != null)
      //   this.router.navigate(['/']);
      // else
      //   this.invalidLogin = true;
    });
  }
}
