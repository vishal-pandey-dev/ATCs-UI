import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { DecimalPipe, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    NgApexchartsModule,
    MatTableModule,
    MatButtonModule,
    MatTableModule, 
    MatIconModule, 
    MatMenuModule, 
    MatButtonToggleModule, 
    MatTooltipModule, 
    NgFor, 
    DecimalPipe
  ],

})
export class DashboardModule {

 }
