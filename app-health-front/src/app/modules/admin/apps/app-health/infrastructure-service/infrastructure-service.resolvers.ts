import { AppHealthInfrastructureProvider, AppHealthInfrastructureService } from '../app-health.types';
import { InfrastructureProviderService } from '../infrastructure-provider/infrastructure-provider.service';
import { infrastructureServiceColumnsConfig } from './infrastructure-service.columns-config';
import { InfrastructureServiceService } from './infrastructure-service.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const infrastructureServicePaginationResolver: ResolveFn<GridData<AppHealthInfrastructureService>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const infrastructureServiceService = inject(InfrastructureServiceService);

    actionService.action({
        id          : 'appHealth::infrastructureService.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::infrastructureService.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::infrastructureService.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::infrastructureService.list.export');

    return infrastructureServiceService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: infrastructureServiceColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const infrastructureServiceNewResolver: ResolveFn<{
    appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const infrastructureServiceService = inject(InfrastructureServiceService);

    actionService.action({
        id          : 'appHealth::infrastructureService.detail.new',
        isViewAction: true,
    });

    return infrastructureServiceService.getRelations();
};

export const infrastructureServiceEditResolver: ResolveFn<{
    appHealthGetInfrastructureProviders: AppHealthInfrastructureProvider[];
    object: AppHealthInfrastructureService;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const infrastructureServiceService = inject(InfrastructureServiceService);

    actionService.action({
        id          : 'appHealth::infrastructureService.detail.edit',
        isViewAction: true,
    });

    return infrastructureServiceService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
