import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { noWhitespaceValidator } from 'app/core/validator';
import { AuthService, UserService } from 'app/core/services';


export interface Alert {
  type   : FuseAlertType,
  message: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations : fuseAnimations

})
export class LoginComponent implements OnInit {
  @ViewChild('loginNgForm') loginNgForm: NgForm;

  loginForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _auth: AuthService,
    private _user          : UserService,
    private _activatedRoute: ActivatedRoute,
    private _http          : HttpClient,
    
  ) {}

  ngOnInit(): void {
    // this.returnUrl = this._activatedRoute.snapshot.queryParams['returnUrl'];

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email,noWhitespaceValidator]],
      password: ['', Validators.required],
      rememberMe: ['']
    });
  }

  login(): void {
      this._auth.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe((result) => {
          if (this.loginForm.value.remember_me) {
              this._auth.setLocalStorage(result.token, result.user);
          }

          this._user.setUser(JSON.stringify(result.user));
          this._user.setLayout('classy');
          this._auth.setToken(result.token);
          this._auth.setIsLoggedIn(true);
          this._router.navigate(['/dashboard']);
        });
      
    }

}
