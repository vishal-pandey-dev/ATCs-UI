import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';
import { AuthService } from 'app/core/services';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
  animations   : fuseAnimations

})
export class SignoutComponent implements OnInit 
{
  countdown: number = 5;
  countdownMapping: any = {
      '=1'   : '# second',
      'other': '# seconds'
  };
  // config: CountdownConfig = {
  //   leftTime: 5,
  //   formatDate: ({ date }) => `${date / 1000}`,
  // };
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private _auth : AuthService
  ) { }

  ngOnInit(): void {
    this._auth.logout()

    timer(1000, 1000)
            .pipe(
                finalize(() => {
                    this._router.navigate(['/auth/login']);
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
