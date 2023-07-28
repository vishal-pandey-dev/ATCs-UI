import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { AuthService, UserService } from 'app/core/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private _auth   : AuthService,
    private _user   : UserService,
    // private _snack  : SnackbarService,
    private _router : Router,

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this._auth.getIsLoggedIn()){
        let user = localStorage.getItem('user');
        let auth_token = localStorage.getItem('authToken');

      if (user && auth_token){
        this._auth.setSessionStorage();

        let theme = this._user.getTheme() ? this._user.getTheme() : 'default';
        this._user.setTheme(theme);

        let scheme = this._user.getScheme() ? this._user.getScheme() : 'light';
        this._user.setScheme(scheme);

        let layout = this._user.getLayout() ? this._user.getLayout() : 'classy';
        this._user.setLayout(layout);

        return true;

      }else{
        localStorage.clear()
        // this._snack.openSnackBar("You are not authorized", "Close", "right", "top");
        this._router.navigate(['/auth/login']);
        return false;
      }
    }

    return true;
  }
}
