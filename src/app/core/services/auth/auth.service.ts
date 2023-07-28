import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http        : HttpClient,
    private _user        : UserService,
    private _url         : AppService,
  ) { }

  login(email: any, password: any): any {
    let creds = {
      email: email,
      username: email,
      password: password
    };
    return this._http.post(this._url.getUrl()+'v1/auth/token/',creds);
  }

  logout(): void {
    this._user.setLayout('empty');
    this._user.setTheme('default');
    this._user.setScheme('light');
    localStorage.clear();
    sessionStorage.clear();
  }

  getToken(): any {
    return sessionStorage.getItem('authToken');
  }

  setToken(token: any): void {
    if (token) {
      localStorage.setItem('authToken',token);
    }
  }

  setIsLoggedIn(isLoggedIn: any): void {
    sessionStorage.setItem('isLoggedIn',isLoggedIn);
  }

  getIsLoggedIn(): any {
    return sessionStorage.getItem('isLoggedIn')|| false;
  }

  setLocalStorage(authToken: any, user: any): void {
    // this._persist.set('authToken', authToken, { type: StorageType.LOCAL });
    // this._persist.set('user', user, { type: StorageType.LOCAL });
    // this._persist.set('setUpDate', new Date().toDateString(), { type: StorageType.LOCAL });

    localStorage.setItem('authToken',authToken);
    localStorage.setItem('user',user);
    localStorage.setItem('setUpDate',new Date().toDateString());
  }

  setSessionStorage(): void {
    this.setToken(localStorage.getItem('authToken'));
    this._user.setUser(localStorage.getItem('user'));
    // sessionStorage.setItem('isLoggedIn','true')
    this.setIsLoggedIn(true);
  }
}