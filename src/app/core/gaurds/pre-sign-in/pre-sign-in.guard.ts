import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService, UserService } from 'app/core/services';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class PreSignInGuard implements CanActivate {

  constructor(
    private _auth          : AuthService,
    private _user          : UserService,
    private _activatedRoute: ActivatedRoute,

    private _router        : Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = localStorage.getItem('user');
      let authToken = localStorage.getItem('authToken');
  
      if (user && authToken) {
        this._auth.setSessionStorage();
      } else {
        localStorage.clear()
      }
  
      if (this._auth.getIsLoggedIn()) {
        let returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];
  
        let theme = this._user.getTheme() ? this._user.getTheme() : 'default';
        this._user.setTheme(theme);
  
        let scheme = this._user.getScheme() ? this._user.getScheme() : 'light';
        this._user.setScheme(scheme);
  
        let layout = this._user.getLayout() ? this._user.getLayout() : 'classy';
        this._user.setLayout(layout);
        
        try {
            returnUrl ? this._router.navigate([returnUrl])
              : this._router.navigate(['/dashboard']);
        } catch {}
      } else {
        return true;
      }
  
      return false;
    }
    
  }