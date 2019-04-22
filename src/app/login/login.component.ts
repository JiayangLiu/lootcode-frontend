import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from './../services/user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  email: string = null;
  password: string = null;
  subscriptionUser: Subscription;
  user: User = null;

  constructor(
    private router: Router, 
    private authService: AuthService) { }

  // signIn(credentials) {
  //   this.authService.login(credentials)
  //     .subscribe(result => { 
  //       if (result)
  //         this.router.navigate(['/']);
  //       else  
  //         this.invalidLogin = true; 
  //     });
  // }
  signIn(form_value) {
    console.log(form_value);
    // this.route.paramMap.subscribe(params => {
      this.email = form_value['email'];
      this.password = form_value['password'];
    // });
    console.log(this.email);
    console.log(this.password);

    this.subscriptionUser = this.authService.login(this.email, this.password)
      .subscribe(user => {
        if (user.userName != null) {
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
    
    // this.authService.login(this.email, this.password)
    //   .subscribe(result => { 
    //     if (result)
    //       this.router.navigate(['/']);
    //     else  
    //       this.invalidLogin = true; 
    //   });
  }
}