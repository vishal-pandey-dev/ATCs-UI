import { Route } from "@angular/router";
import { ServersComponent } from "./servers.component";
import { ServerComponent } from "./server/server.component";
import { NodeListResolver, ServerResolver } from "app/core/resolvers";

export const serversRoutes: Route[] = [
    {
        path: '',
        component: ServersComponent,
        resolve  : {
            nodes: NodeListResolver,
        },
    },
    {
        path: ':nodeId',
        component:ServerComponent,
        resolve  : {
            node: ServerResolver
        },
        data:[':nodeId'],
    }
];
