import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignoutComponent } from './signout.component';
import { signoutRoutes } from './signout.routing';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
// import { FuseAlertModule } from '@fuse/components/alert';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [
    SignoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(signoutRoutes),

    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    // CountdownModule,

    // FuseAlertModule,
    SharedModule
  ]
})
export class SignoutModule { }
