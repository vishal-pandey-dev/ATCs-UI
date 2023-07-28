import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { AppService } from 'app/app.service';

@Injectable({
  providedIn: 'root'
})
export class NodeDataService {

  nodeData : any;

  constructor(
    private _http        : HttpClient,
    private _user        : UserService,
    private _url         : AppService,
  ) { }

  // login(email: any, password: any): any {
  //   let creds = {
  //     email: email,
  //     username: email,
  //     password: password
  //   };
  //   return this._http.post(this._url.getUrl()+'v1/auth/token/',creds);
  // }

  getNodeData(nodes_api_url):any{
    console.log(nodes_api_url);
    return this._http.get(nodes_api_url).subscribe((res) => {
        this.nodeData = res['results'];
        console.log(this.nodeData);
      });
  }

}