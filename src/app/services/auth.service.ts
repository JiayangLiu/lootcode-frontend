import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";   // different after upgrade
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpHeaders } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  loginObservable: Observable<User>;
  signupObservable: Observable<User>;

  constructor(private http: HttpClient) {
  }

  // login(credentials) {
  //   return this.http.post('/api/authenticate',
  //     JSON.stringify(credentials))
  //     .pipe(map(response => {   // different after upgrade
  //       let result = response.json();
  //       if (result && result.token) {
  //         localStorage.setItem('token', result.token);
  //         return true;
  //       } else
  //         return false;
  //     }));
  // }

  login(email: string, password: string) {
    console.log("--" + email);
    console.log("--" + password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.loginObservable = this.http.post<User>('http://power3.cs.virginia.edu:18888/api/login', JSON.stringify(
      {
        "email": email,
        "password": password
      }), httpOptions);
    return this.loginObservable;
  }

  // signUp(credentials) {
  //   return this.http.post('/api/signup',
  //     JSON.stringify(credentials))
  //     .pipe(map(response => {
  //       let result = response.json();
  //       if (result && result.token) {
  //         localStorage.setItem('token', result.token);
  //         return true;
  //       } else
  //         return false;
  //     }));
  // }

  // signUp(credentials) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json'
  //       })
  //     };
  //     this.loginObservable = this.http.post<User>('http://power3.cs.virginia.edu:18888/api/login', JSON.stringify(
  //       {
  //         "email": credentials,
  //         "password": credentials
  //       }), httpOptions);
  //     return this.loginObservable;
  //   }

  signUp(email: string, username:string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.signupObservable = this.http.post<User>('http://power3.cs.virginia.edu:18888/api/user/signup', JSON.stringify(
      {
        "email": email,
        "userName": username,
        "password": password,
        "isAdmin": 0
      }), httpOptions);
    // this.signupObservable
    //   .pipe(map(response => {   // different after upgrade
    //     let result = response;
    //     if (result && result.userName)
    //       localStorage.setItem('username', result.userName);
    //       localStorage.setItem('admin', result.admin? "true" : "false");
    //     }));
    // return false;
    return this.signupObservable;
  }

  // delete the toke from localStorage
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('admin');
  }

  isLoggedIn() {
    return (localStorage.getItem('username')!=null);
    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');

    // if (!token)   // is token is null
    //   return false;

    // let isExpired = jwtHelper.isTokenExpired(token);

    // return !isExpired;
  }

  isAdmin() {
    let token = localStorage.getItem('admin');
    if (!token)
      return null;
    return token=="true";
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}