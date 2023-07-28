import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from 'app/app.service';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeListResolver implements Resolve<any> {
  nodeData : any;
  nodes : any;

  constructor(
    private _http: HttpClient,
    private _url: AppService,
    
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
      // if (route){
      return this.getNodeData();
      // }
      // return;
  }

  
  getNodeData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(this._url.getUrl()+'v1/nodes/').subscribe((result) => {
        this.nodes = result['results'];
        for (let node of this.nodes) {
          var base_url = node['base_url'];

          if (window.location.host?.includes('localhost') || window.location.host?.includes('127.0.0.1')) {
            base_url = 'http://localhost:8001';
          }

          if (base_url == null){
              base_url = 'http://'+node['ip_address'];
            }
            var server_info_api_url = (base_url +'/v1/server-info');
          // node['server_info'] =this.getServerInfo(server_info_api_url)?.then;
          this.getServerInfo(server_info_api_url).then((res: any) => { node['server_info'] = res });
        }
        resolve(this.nodes);
      })
    });
  }


  getServerInfo(server_info_api_url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http.get(server_info_api_url).subscribe((result:any) => {
        var server_info = result;
        resolve(server_info);
      });
    })
  }

}