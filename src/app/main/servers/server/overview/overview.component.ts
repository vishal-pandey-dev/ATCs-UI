import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService, UserService } from 'app/core/services';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { DateTime } from 'luxon';
import { AppService } from 'app/app.service';

@Component({
  selector: 'overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy{
  
  chartVisitors: ApexOptions;
  chartVisitorsVsPageViews:ApexOptions;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
    nodeData: any;
    nodeId: any;
    converted_to_gb: number;
    

  

  constructor(
    private _analyticsService: AnalyticsService,
    private _router: Router,
    public _user: UserService,
    public _http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _url           : AppService,
)
{
}


ngOnInit(): void {
  this._analyticsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                    // this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void =>
                    {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void =>
                    {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };

        this._activatedRoute.data.subscribe((data: { node: any }) => {
            this.nodeId = data.node;
          });

        this._http.get(this._url.getUrl()+'v1/nodes/'+this.nodeId).subscribe((res) =>{
      
            // this.nodeData.push(res);
            this.nodeData= res;
        })
        setTimeout(() => 
        {
        console.log(this.nodeData);
        },
        2000);
}
    


  private _fixSvgFill(el: any) {
    // throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  public convertToGb(data){
    return this.converted_to_gb = Math.round(data/(1024**3)*100)/100;
  }

  private _prepareChartData(): void
    {
    const now = DateTime.now();
    let series_list = [
        {
            name: 'Visitors',
            data: [
                {
                    x: now.minus({months: 12}).plus({day: 1}).toJSDate(),
                    y: 4884,
                },
                {
                    x: now.minus({months: 12}).plus({day: 4}).toJSDate(),
                    y: 5351,
                },
                {
                    x: now.minus({months: 12}).plus({day: 7}).toJSDate(),
                    y: 5293,
                },
                {
                    x: now.minus({months: 12}).plus({day: 10}).toJSDate(),
                    y: 4908,
                },
                {
                    x: now.minus({months: 12}).plus({day: 13}).toJSDate(),
                    y: 5027,
                },
                {
                    x: now.minus({months: 12}).plus({day: 16}).toJSDate(),
                    y: 4837,
                },
                {
                    x: now.minus({months: 12}).plus({day: 19}).toJSDate(),
                    y: 4484,
                },
            ]
        }
    ]

      this.chartVisitors = {
        chart     : {
            animations: {
                speed           : 400,
                animateGradually: {
                    enabled: false,
                },
            },
            fontFamily: 'inherit',
            foreColor : 'inherit',
            width     : '100%',
            height    : '100%',
            type      : 'area',
            toolbar   : {
                show: false,
            },
            zoom      : {
                enabled: false,
            },
        },
        colors    : ['#818CF8'],
        dataLabels: {
            enabled: false,
        },
        fill      : {
            colors: ['#312E81'],
        },
        grid      : {
            show       : true,
            borderColor: '#334155',
            padding    : {
                top   : 10,
                bottom: -40,
                left  : 0,
                right : 0,
            },
            position   : 'back',
            xaxis      : {
                lines: {
                    show: true,
                },
            },
        },
        series    : series_list,
        stroke    : {
            width: 2,
        },
        tooltip   : {
            followCursor: true,
            theme       : 'dark',
            x           : {
                format: 'MMM dd, yyyy',
            },
            y           : {
                formatter: (value: number): string => `${value}`,
            },
        },
        xaxis     : {
            axisBorder: {
                show: false,
            },
            axisTicks : {
                show: false,
            },
            crosshairs: {
                stroke: {
                    color    : '#475569',
                    dashArray: 0,
                    width    : 2,
                },
            },
            labels    : {
                offsetY: -20,
                style  : {
                    colors: '#CBD5E1',
                },
            },
            tickAmount: 20,
            tooltip   : {
                enabled: false,
            },
            type      : 'datetime',
        },
        yaxis     : {
            axisTicks : {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            min       : (min): number => min - 750,
            max       : (max): number => max + 250,
            tickAmount: 5,
            show      : false,
        },
    };


    let series_temp_list      = [
        {
            name: 'Page Views',
            data: [
                {
                    x: now.minus({days: 65}).toJSDate(),
                    y: 4769,
                },
                {
                    x: now.minus({days: 64}).toJSDate(),
                    y: 4901,
                },
                {
                    x: now.minus({days: 63}).toJSDate(),
                    y: 4640,
                },
                {
                    x: now.minus({days: 62}).toJSDate(),
                    y: 5128,
                },
                {
                    x: now.minus({days: 61}).toJSDate(),
                    y: 5015,
                },
                {
                    x: now.minus({days: 60}).toJSDate(),
                    y: 5360,
                },
                {
                    x: now.minus({days: 59}).toJSDate(),
                    y: 5608,
                },
                {
                    x: now.minus({days: 58}).toJSDate(),
                    y: 5272,
                },
                {
                    x: now.minus({days: 57}).toJSDate(),
                    y: 5660,
                },
                {
                    x: now.minus({days: 56}).toJSDate(),
                    y: 6026,
                },
                {
                    x: now.minus({days: 55}).toJSDate(),
                    y: 5836,
                },
                {
                    x: now.minus({days: 54}).toJSDate(),
                    y: 5659,
                },
            ]
        }
    ]

    this.chartVisitorsVsPageViews = {
            chart     : {
                animations: {
                    enabled: false,
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                height    : '100%',
                type      : 'area',
                toolbar   : {
                    show: false,
                },
                zoom      : {
                    enabled: false,
                },
            },
            colors    : ['#64748B', '#94A3B8'],
            dataLabels: {
                enabled: false,
            },
            fill      : {
                colors : ['#64748B', '#94A3B8'],
                opacity: 0.5,
            },
            grid      : {
                show   : false,
                padding: {
                    bottom: -40,
                    left  : 0,
                    right : 0,
                },
            },
            legend    : {
                show: false,
            },
            series    : series_temp_list,
            stroke    : {
                curve: 'smooth',
                width: 2,
            },
            tooltip   : {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'MMM dd, yyyy',
                },
            },
            xaxis     : {
                axisBorder: {
                    show: false,
                },
                labels    : {
                    offsetY: -20,
                    rotate : 0,
                    style  : {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                tickAmount: 3,
                tooltip   : {
                    enabled: false,
                },
                type      : 'datetime',
            },
            yaxis     : {
                labels    : {
                    style: {
                        colors: 'var(--fuse-text-secondary)',
                    },
                },
                max       : (max): number => max + 250,
                min       : (min): number => min - 250,
                show      : false,
                tickAmount: 5,
            },
        };
    }
  

}
