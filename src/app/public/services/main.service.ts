import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
​
@Injectable()
export class MainService {
​
  public baseURL: String = "https://equity-advisors.herokuapp.com/";
  //public baseURL: String = "http://localhost:8080/";
  public headers: Headers;
​
  constructor(private http: Http, public authService: AuthService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', this.authService.getToken());
  }
​
  get(object: String) {
    return this.http.get(this.baseURL + '' + object, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
​
  post(object: String, data: any) {
    return this.http.post(this.baseURL + '' + object, JSON.stringify(data), { headers: this.headers })
      .pipe(
        map(res => res.json())
      );
  }
​
  delete(object: String) {
    return this.http.delete(this.baseURL + '' + object, { headers: this.headers })
    .pipe(map(res => res.json()));
  }
​
  put(object: String, data: any) {
    return this.http.put(this.baseURL + '' + object, JSON.stringify(data), { headers: this.headers })
      .pipe(
        map(res => res.json())
      );
  }
​
  public formatMoney(number) {
    if (number != undefined && number != null) {
      let formatted = number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      return formatted.split('.')[0];
    }
  }
​
}



