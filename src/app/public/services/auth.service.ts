import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { map } from 'rxjs/operators';
​
@Injectable()
export class AuthService {
​
  public authToken: any;
  public user: any;
  public headers: Headers;
  public baseUrl: string = "https://equity-advisors.herokuapp.com/";
  // public baseUrl: string = "http://localhost:8080/";
​
  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.user = JSON.parse(localStorage.getItem('usuario')) || {};
  }
  
  public authenticateUser(user) {
      return this.http.post(this.baseUrl + "users/authenticate", JSON.stringify(user), { headers: this.headers })
      .pipe(map(res => res.json()));
  }
​
  public registerUser(user) {
    return this.http.post(this.baseUrl + "users/register", JSON.stringify(user), { headers: this.headers })
    .pipe(map(res => res.json()));
  }
​
  public forgot(email) {
    const obj = { email };
    return this.http.post(this.baseUrl + "users/forgot", JSON.stringify(obj), { headers: this.headers })
    .pipe(map(res => res.json()));
  }
​
  public change(email, password, passwordNew) {
    const obj = { email, password, passwordNew };
    return this.http.post(this.baseUrl + "users/change", JSON.stringify(obj), { headers: this.headers })
    .pipe(map(res => res.json()));
  }
​
  public storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
​
  public loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
​
  public logout() {
    this.authToken = null;
    this.user = {};
    localStorage.clear();
  }
​
  public getToken() {
    this.loadToken();
    return this.authToken;
  }
​
  public loggedIn() {
    return tokenNotExpired('id_token');
  }
​
  public getUser() {
    return this.user;
  }
​
}



