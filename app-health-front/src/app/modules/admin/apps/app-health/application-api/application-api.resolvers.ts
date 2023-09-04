import { AppHealthApplicationApi } from '../app-health.types';
import { applicationApiColumnsConfig } from './application-api.columns-config';
import { ApplicationApiService } from './application-api.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationApiPaginationResolver: ResolveFn<GridData<AppHealthApplicationApi>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationApiService = inject(ApplicationApiService);

    actionService.action({
        id          : 'appHealth::applicationApi.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationApi.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationApi.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationApi.list.export');

    return applicationApiService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationApiColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationApiNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::applicationApi.detail.new',
        isViewAction: true,
    });
};

export const applicationApiEditResolver: ResolveFn<{
    object: AppHealthApplicationApi;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationApiService = inject(ApplicationApiService);

    actionService.action({
        id          : 'appHealth::applicationApi.detail.edit',
        isViewAction: true,
    });

    return applicationApiService
        .findById({
            id: route.paramMap.get('id'),
        });
};
