/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { AppHealthComponent } from './app-health.component';
import { ApiInterfaceTypeListComponent } from './api-interface-type/api-interface-type-list.component';
import { ApiInterfaceTypeDetailComponent } from './api-interface-type/api-interface-type-detail.component';
import { apiInterfaceTypeEditResolver, apiInterfaceTypeNewResolver, apiInterfaceTypePaginationResolver } from './api-interface-type/api-interface-type.resolvers';

export default [
    {
        path     : '',
        component: AppHealthComponent,
        children : [
            { path: 'api-interface-type', component: ApiInterfaceTypeListComponent, resolve: { data: apiInterfaceTypePaginationResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
            { path: 'api-interface-type/new', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeNewResolver }, data: { permission: 'appHealth.apiInterfaceType.create' }},
            { path: 'api-interface-type/edit/:id', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeEditResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
        ],
        providers: [
            {
                provide : TRANSLOCO_SCOPE,
                useValue: 'app-health',
                multi   : true,
            },
        ],
    },
];
