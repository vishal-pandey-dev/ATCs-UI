import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

import { IsLoggedInGuard } from './core/gaurds/is-logged-in/is-logged-in.guard';
import { PreSignInGuard } from './core/gaurds/pre-sign-in/pre-sign-in.guard';
import { NodeListResolver } from './core/resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    {
        path: '',
        pathMatch : 'full',
        redirectTo: 'auth/login'
    },
    {
        path: '',
        canActivate: [],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'auth/login',
                loadChildren: () => import('app/main/auth/login/login.module').then(m => m.LoginModule),
                canActivate : [ PreSignInGuard ]
            },
            {
                path: 'auth/signout',
                loadChildren: () => import('app/main/auth/signout/signout.module').then(m => m.SignoutModule),
                canActivate : [ IsLoggedInGuard ]
            },
        ]
    },
    {
        path: '',
        canActivate: [IsLoggedInGuard],
        component: LayoutComponent,
        data: {
            layout: 'classy'
        },
        resolve: {
            nodes: NodeListResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('app/main/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'servers',
                loadChildren: () => import('app/main/servers/servers.module').then(m => m.ServersModule),
            },
            
        ]
    },
    
];
