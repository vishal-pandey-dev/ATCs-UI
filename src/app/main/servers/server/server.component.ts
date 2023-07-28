import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { UserService } from 'app/core/services';
import { List } from 'lodash';


@Component({
  selector: 'server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  encapsulation : ViewEncapsulation.None,
})
export class ServerComponent implements OnInit{
  userData     : any;
  nodeId: any;
  public nodeData =[] ;
  ip_address:any;
  hostname:any;
  nodeDict :any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _user          : UserService,
    private _url           : AppService,
    public _http           : HttpClient,
  ) {}
  
  ngOnInit(): void {
    this.userData = this._user.getUser();
    console.log();
    this._activatedRoute.data.subscribe((data: { node: any }) => {
      this.nodeId = data.node;
    });

    // console.log(this._url.getUrl()+'v1/nodes/'+this.nodeData);
    

    this._http.get(this._url.getUrl()+'v1/nodes/'+this.nodeId).subscribe((res) =>{
      
      this.nodeData.push(res);
      this.ip_address = this.nodeData[0]['ip_address'];
      this.hostname = this.nodeData[0]['hostname'];
      // this.nodeDict= res
    })
    
    // setTimeout(() => 
    // {
    //   console.log(this.nodeDict);
    // },
    // 2000);
    
  }


}
