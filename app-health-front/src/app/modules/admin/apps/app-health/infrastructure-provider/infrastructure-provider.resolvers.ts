import { AppHealthInfrastructureProvider } from '../app-health.types';
import { infrastructureProviderColumnsConfig } from './infrastructure-provider.columns-config';
import { InfrastructureProviderService } from './infrastructure-provider.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const infrastructureProviderPaginationResolver: ResolveFn<GridData<AppHealthInfrastructureProvider>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const infrastructureProviderService = inject(InfrastructureProviderService);

    actionService.action({
        id          : 'appHealth::infrastructureProvider.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::infrastructureProvider.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::infrastructureProvider.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::infrastructureProvider.list.export');

    return infrastructureProviderService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: infrastructureProviderColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const infrastructureProviderNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::infrastructureProvider.detail.new',
        isViewAction: true,
    });
};

export const infrastructureProviderEditResolver: ResolveFn<{
    object: AppHealthInfrastructureProvider;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const infrastructureProviderService = inject(InfrastructureProviderService);

    actionService.action({
        id          : 'appHealth::infrastructureProvider.detail.edit',
        isViewAction: true,
    });

    return infrastructureProviderService
        .findById({
            id: route.paramMap.get('id'),
        });
};
