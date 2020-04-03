import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import {HttpResponse} from '@angular/common/http';
//import {tokenNotExpired} from 'angular2-jwt';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user,{headers: headers});
    //.pipe(map((res: Response) => res.json()));

  }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user,{headers: headers});

  }

  getProfile(){
    this.loadToken();
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json'
    });
    return this.http.get('http://localhost:3000/users/profile',{headers});

  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;

  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    //console.log(token);
  }

  loggedIn(){
    if(localStorage.getItem('id_token')){
      return true;
    }
    
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  

  
}
