import { Route } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NodeDataService } from "app/core/services";
import { inject } from "@angular/core";
import { NodeListResolver } from "app/core/resolvers";

export const dashboardRoutes: Route[] = [
    {
        path: '',
        component: DashboardComponent,
        resolve  : {
            nodes: NodeListResolver,
        },
    }
];
