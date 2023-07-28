import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService, UserService } from 'app/core/services';
import { ApexOptions } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Node } from './dashboard.type';
import { AppService } from 'app/app.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {



  donutChartOptions: ApexOptions;
  totalCPUStats: ApexOptions;
  totalRAMStats: ApexOptions;
  totalDiskStats: ApexOptions;
  serverStats: ApexOptions;

  chartVisitors: ApexOptions;
  chartNewVsReturning: ApexOptions;
  chartVisits: ApexOptions;
  chartVisitorsVsPageViews: ApexOptions;
  chartAge: ApexOptions;
  chartLanguage: ApexOptions;
  serverStatus: ApexOptions;
  bargraphOptions: ApexOptions;
  data: any;
  disk_usage_percent:any;
  dataSource: MatTableDataSource<Node>;
  availableNodes: number;
  displayColumns: string[] = [
    'ip_address', 'hostname', 'operating_system',
    'cpu_usage', 'ram_usage', 'disk_usage'
  ];


  private _unsubscribeAll: Subject<any> = new Subject<any>();
  url: any;
  servers: any;
  userData: any;
  nodes: any;
  interval: any = null;


  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  timer = null;
  server_info_flag = false;

  /**
   * Constructor
   */
  constructor(
    private _analyticsService: AnalyticsService,
    private _router: Router,
    public _user: UserService,
    public _http: HttpClient,
    private _url: AppService,
    private _activatedRoute: ActivatedRoute,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._activatedRoute.data.subscribe((data: { nodes: any[] }) => {
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
            if ((i == (this.nodes.length - 1)) && (this.interval != null)) {
              setTimeout(() => {
                clearInterval(this.interval);
              }, 5000);
            }
          });
        }

        this.interval = setInterval(() => {
          for (let node of this.nodes) {
            this.prepareChartData();
          }
          this.dataSource = new MatTableDataSource<Node>(this.nodes);
        }, 9000);
        console.log(this.nodes);
        this.availableNodes = this.nodes.length;
        
      }
    });
    this.userData = this._user.getUser();
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  trackByFn(index: number, item: any): any {
    // return item.id || index;
  }

  private _fixSvgFill(element: Element): void {
    // const currentURL = this._router.url;
    // Array.from(element.querySelectorAll('*[fill]'))
    //     .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
    //     .forEach((el) =>
    //     {
    //         const attrVal = el.getAttribute('fill');
    //         el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
    //     });
  }

  prepareChartData(): void {
    this.prepareChartOptions();

    this.totalCPUStats = {
      labels: ['0', '0', '0', '0'],
      series: [25, 25, 25, 25]
    };
    this.totalRAMStats = {
      labels: ['0', '0', '0', '0'],
      series: [25, 25, 25, 25]
    };
    this.totalDiskStats = {
      labels: ['0', '0', '0', '0'],
      series: [25, 25, 25, 25]
    };

    let cpu_usage = [];
    let ram_usage = [];
    let disk_usage = [];
    let ip_address = [];


    for (let node of this.nodes) {
      if (node.server_info) {
        try {
          var CPU = node.server_info.cpu.usage.total;
          if ((0 <= CPU.percent) && (CPU.percent <= 50)) {
            this.totalCPUStats.labels[0] = `${parseInt(this.totalCPUStats.labels[0]) + 1}`;
          } else if ((50 < CPU.percent) && (CPU.percent <= 75)) {
            this.totalCPUStats.labels[1] = `${parseInt(this.totalCPUStats.labels[1]) + 1}`;
          } else if ((75 < CPU.percent) && (CPU.percent <= 90)) {
            this.totalCPUStats.labels[2] = `${parseInt(this.totalCPUStats.labels[2]) + 1}`;
          } else {
            this.totalCPUStats.labels[3] = `${parseInt(this.totalCPUStats.labels[3]) + 1}`;
          }
        } catch { }

        try {
          var RAM = node.server_info.memory.virtual;
          if ((0 <= RAM.percent) && (RAM.percent <= 50)) {
            this.totalRAMStats.labels[0] = `${parseInt(this.totalRAMStats.labels[0]) + 1}`;
          } else if ((50 < RAM.percent) && (RAM.percent <= 75)) {
            this.totalRAMStats.labels[1] = `${parseInt(this.totalRAMStats.labels[1]) + 1}`;
          } else if ((75 < RAM.percent) && (RAM.percent <= 90)) {
            this.totalRAMStats.labels[2] = `${parseInt(this.totalRAMStats.labels[2]) + 1}`;
          } else {
            this.totalRAMStats.labels[3] = `${parseInt(this.totalRAMStats.labels[3]) + 1}`;
          }
        } catch { }

        try {
          var disk_partitions = node.server_info.disk.partitions;
          if (disk_partitions.length > 0) {
            var total_disk_usage = 0;
            for (let partition of disk_partitions) {
              total_disk_usage += partition.usage;
            }
            //console.log(`total_disk_usage = ${total_disk_usage}/${disk_partitions.length}*100 = ${total_disk_usage}/${disk_partitions.length * 100} = ${total_disk_usage / (disk_partitions.length * 100)}`);
            total_disk_usage = (total_disk_usage / (disk_partitions.length * 100)) * 100;
            if ((0 <= total_disk_usage) && (total_disk_usage <= 50)) {
              this.totalDiskStats.labels[0] = `${parseInt(this.totalDiskStats.labels[0]) + 1}`;
            } else if ((50 < total_disk_usage) && (total_disk_usage <= 75)) {
              this.totalDiskStats.labels[1] = `${parseInt(this.totalDiskStats.labels[1]) + 1}`;
            } else if ((75 < total_disk_usage) && (total_disk_usage <= 90)) {
              this.totalDiskStats.labels[2] = `${parseInt(this.totalDiskStats.labels[2]) + 1}`;
            } else {
              this.totalDiskStats.labels[3] = `${parseInt(this.totalDiskStats.labels[3]) + 1}`;
            }
          }
        } catch { }

        try {
          var serverStatsCPU = node.server_info.cpu.usage.total.percent;
          var serverStatsRAM = node.server_info.memory.virtual.percent;
          var serverStatsDISK = node.server_info.disk.partitions;
          var serverStatsIP = node.ip_address;


          var server_disk_stats = 0;
          for (let partition of serverStatsDISK) {
            server_disk_stats += partition.usage;
          }
          server_disk_stats = (server_disk_stats / (serverStatsDISK.length * 100)) * 100;
          this.disk_usage_percent = server_disk_stats;

          cpu_usage.push(serverStatsCPU);
          ram_usage.push(serverStatsRAM);
          disk_usage.push(server_disk_stats);
          ip_address.push(serverStatsIP);

        } catch { }

      }
    }

    this.serverStats = {
      series: [
        {
          name: "CPU",
          data: cpu_usage
        },
        {
          name: "RAM",
          data: ram_usage
        },
        {
          name: "DISK",
          data: disk_usage
        }
      ],
      xaxis: {
        categories: ip_address
        // categories: [
        //   'A', 'B', 'C'
        // ]
      },
    }
  }

  prepareChartOptions(): void {
    this.donutChartOptions = {
      chart: {
        animations: {
          speed: 400,
          animateGradually: {
            enabled: false
          }
        },
        fontFamily: 'inherit',
        foreColor: 'inherit',
        height: '100%',
        type: 'donut',
        sparkline: {
          enabled: true,
        }
      },
      colors: ['#39811D', '#90EE90', '#F4A540', '#ED3833'],
      plotOptions: {
        pie: {
          customScale: 0.9,
          expandOnClick: false,
          donut: {
            size: '70%',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function () {
          return  "10%"
        }
      },
      states: {
        hover: {
          filter: {
            type: 'none',
          },
        },
        active: {
          filter: {
            type: 'none',
          },
        },
      },
      tooltip: {
        enabled: true,
        fillSeriesColor: false,
        theme: 'dark',
        custom: ({ seriesIndex, w }): string => {
          return `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
            <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-2 text-md leading-none">Node:${w.config.labels[seriesIndex]}</div>
          </div>`
        }
      },
    };


    this.bargraphOptions = {
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    };
  }

  show
}

