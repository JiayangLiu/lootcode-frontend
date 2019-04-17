import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";   // different after upgrade
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .pipe(map(response => {   // different after upgrade
        let result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        } else
          return false;
      }));
  }

  // delete the toke from localStorage
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    return tokenNotExpired();
    // let jwtHelper = new JwtHelper();
    // let token = localStorage.getItem('token');

    // if (!token)   // is token is null
    //   return false;

    // let isExpired = jwtHelper.isTokenExpired(token);
    
    // return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token)
      return null;
    return new JwtHelper().decodeToken(token);
  }
}