import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  getNavigationItems(): FuseNavigationItem[] {
    let navigation: FuseNavigationItem[] = [
        {
          id      : 'dashboards',
          title   : 'Dashboards',
          subtitle: 'Unique dashboard designs',
          type    : 'group',
          icon    : 'heroicons_outline:home',
          children: [
              {
                id   : 'dashboard',
                title: 'Dashboard',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-document-check',
                link : '/dashboard',
              },
              {
                  id   : 'Servers',
                  title: 'Servers',
                  type : 'basic',
                  icon : 'heroicons_outline:server-stack',
                  link : '/servers',
              },
              {
                  id   : 'Websites',
                  title: 'Websites',
                  type : 'basic',
                  icon : 'heroicons_solid:globe-americas',
                  link : '/website',
              },
              {
                  id   : 'NetworkChecks',
                  title: 'Network Checks',
                  type : 'basic',
                  icon : 'heroicons_outline:check-circle',
                  link : '/network',
              },
            //   {
            //       id   : 'SSL',
            //       title: 'SSL Checks',
            //       type : 'basic',
            //       icon : 'heroicons_outline:lock-closed',
            //       link : '/ssl',
            //   },
            //   {
            //       id   : 'LogAnalyzer',
            //       title: 'Log Analyzer',
            //       type : 'basic',
            //       icon : 'heroicons_outline:chart-pie',
            //       link : '/loganalyzer',
            //   },
            //   {
            //       id   : 'Pages',
            //       title: 'Pages',
            //       type : 'basic',
            //       icon : 'heroicons_outline:home',
            //       link : '/pages',
            //   },
              {
                  id   : 'Settings',
                  title: 'Settings',
                  type : 'basic',
                  icon : 'heroicons_outline:cog-8-tooth',
                  link : '/settings',
              },
          ],
      }
    ];
    return navigation;
}
}
