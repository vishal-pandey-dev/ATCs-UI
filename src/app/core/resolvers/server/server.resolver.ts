import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<any> {
  node : any;

  constructor(
    private _http: HttpClient,
    private _url: AppService,
    
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
      if (route.params['nodeId']){
        return this.getNode(route.params['nodeId']);
      }
      return;
  }

  getNode(id) {
    return new Promise((resolve, reject)=>{
      this._http.get(this._url.getUrl()+`v1/nodes/${id}/`).subscribe((result) => {
        // console.log(result);
        this.node = result['id'];
          resolve(this.node);
         },(error) => {
         console.log("ERROR GETTING CLASSROOM DETAILS ", error);
      })
    })
  }
}
