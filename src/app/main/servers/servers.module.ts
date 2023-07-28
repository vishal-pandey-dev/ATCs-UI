import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { serversRoutes } from './servers.routing';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ServerComponent } from './server/server.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ServersComponent } from './servers.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { OverviewComponent } from './server/overview/overview.component';





@NgModule({
  declarations: [
    ServersComponent,
    ServerComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(serversRoutes),
    NgApexchartsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule, 
    MatMenuModule, 
    MatButtonToggleModule, 
    NgApexchartsModule, 
    MatTooltipModule, 
    NgFor, 
    DecimalPipe,
    MatProgressSpinnerModule,
    MatCardModule,
    NgCircleProgressModule,
    MatTableModule,
    TranslocoModule, 
    MatRippleModule, 
    MatTabsModule, 
    NgIf, 
    NgClass, 
    CurrencyPipe,
    MatPaginatorModule
  ]
})
export class ServersModule { }




