/* eslint-disable max-len */
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { AppHealthComponent } from './app-health.component';
import { ApiInterfaceTypeListComponent } from './api-interface-type/api-interface-type-list.component';
import { ApiInterfaceTypeDetailComponent } from './api-interface-type/api-interface-type-detail.component';
import { apiInterfaceTypeEditResolver, apiInterfaceTypeNewResolver, apiInterfaceTypePaginationResolver } from './api-interface-type/api-interface-type.resolvers';
import { TechnicalSolutionListComponent } from './technical-solution/technical-solution-list.component';
import { TechnicalSolutionDetailComponent } from './technical-solution/technical-solution-detail.component';
import { technicalSolutionEditResolver, technicalSolutionNewResolver, technicalSolutionPaginationResolver } from './technical-solution/technical-solution.resolvers';

export default [
    {
        path     : '',
        component: AppHealthComponent,
        children : [
            { path: 'api-interface-type', component: ApiInterfaceTypeListComponent, resolve: { data: apiInterfaceTypePaginationResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
            { path: 'api-interface-type/new', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeNewResolver }, data: { permission: 'appHealth.apiInterfaceType.create' }},
            { path: 'api-interface-type/edit/:id', component: ApiInterfaceTypeDetailComponent, resolve: { data: apiInterfaceTypeEditResolver }, data: { permission: 'appHealth.apiInterfaceType.get' }},
            { path: 'technical-solution', component: TechnicalSolutionListComponent, resolve: { data: technicalSolutionPaginationResolver }, data: { permission: 'appHealth.technicalSolution.get' }},
            { path: 'technical-solution/new', component: TechnicalSolutionDetailComponent, resolve: { data: technicalSolutionNewResolver }, data: { permission: 'appHealth.technicalSolution.create' }},
            { path: 'technical-solution/edit/:id', component: TechnicalSolutionDetailComponent, resolve: { data: technicalSolutionEditResolver }, data: { permission: 'appHealth.technicalSolution.get' }},
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
