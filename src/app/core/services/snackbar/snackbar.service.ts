import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar : MatSnackBar) { }
  openSnackBar(message: string, action: string,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition) { 
  
  this.snackbar.open(message, action, { 
     duration: 2000,
     horizontalPosition: horizontalPosition,
     verticalPosition: verticalPosition, 
     panelClass: ['custom-snackbar']
    });
  }

}
