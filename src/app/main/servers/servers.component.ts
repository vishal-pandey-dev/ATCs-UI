import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/services';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Node } from './servers.type';
import { MatPaginator } from '@angular/material/paginator';
import { AppService } from 'app/app.service';


@Component({
  selector: 'servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ServersComponent implements OnInit, OnDestroy {
  
  
  dataSource : MatTableDataSource<Node>;
  displayColumns: string[] = [
    'ip_address', 'hostname', 'operating_system',
    'cpu_usage', 'ram_usage', 'disk_usage',
    'net_stats', 'actions'
  ];

  public percent_value:any;
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public net_packets_sent_new: number;
  nodes: any;
  interval: any = null;
  userData: any;
  disk_usage_percent: any;

  @ViewChild(MatPaginator) set _paginator(paginator: MatPaginator) {
    try {
        this.dataSource.paginator = paginator;
        // console.log(paginator);
    } catch {
      // console.log(paginator);
    }
  }

  constructor(
    private _router: Router,
    public _user: UserService,
    public _http: HttpClient,
    private _url: AppService,
    private _activatedRoute: ActivatedRoute,
)
{
}

  ngOnInit(): void
    {
        // this._http.get(this._url.getUrl()+'v1/nodes/').subscribe((res) => {
        //   this.dataSource = new MatTableDataSource<Node>(res['results']);
        //   // console.log(res);
        //   if (this.dataSource?.paginator) {
        //     this.dataSource?.paginator?.firstPage();
        //   }
        // });

      this._activatedRoute.data.subscribe((data: { nodes: any[] }) => {
        console.log(data.nodes);
        if (data.nodes.length > 0) {
          this.nodes = data.nodes;
          for (let i = 0; i < this.nodes.length; i++) {
            var node = this.nodes[i];
            var base_url = node?.base_url ? node.base_url : node.ip_address;
            var server_info_api_url = `${base_url}/v1/server-info/`;
            if (window.location.host?.includes('localhost') || window.location.host?.includes('127.0.0.1')) {
              server_info_api_url = 'http://localhost:8001/v1/server-info/';
            }
            this._http.get(server_info_api_url).subscribe((result: any) => {
              this.nodes[i]['server_info'] = result;
              console.log(this.nodes[i]['server_info']);
              
              if ((i == (this.nodes.length - 1)) && (this.interval != null)) {
                setTimeout(() => {
                  clearInterval(this.interval);
                }, 5000);
              }
            });
          }
  
          this.interval = setInterval(() => {
            this.dataSource = new MatTableDataSource<Node>(this.nodes);
            for (let node of this.nodes) {
              var serverStatsDISK = node.server_info.disk.partitions;
              var server_disk_stats = 0;
                for (let partition of serverStatsDISK) {
                  server_disk_stats += partition.usage;
                }
              server_disk_stats = (server_disk_stats / (serverStatsDISK.length * 100)) * 100;
              this.disk_usage_percent = server_disk_stats;
            }
            
          }, 9000);
          // console.log(this.nodes);
          
        }
      });
      this.userData = this._user.getUser();
      
    }
    
    
  
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    public convertToKb(data){
      return this.net_packets_sent_new = Math.round(data/(1024*3600)*100)/100;
    }

    public convertToGb(data){
      return this.net_packets_sent_new = Math.round(data/(1024**3)*100)/100;
    }

    public os_img(data){
      if(data == "Ubuntu 20.04.6 LTS"){
        return "assets/icons/ubuntu.png"
      }
      else{
        return "assets/icons/centOS.png"
      }
    }

}

