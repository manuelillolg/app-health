import { AppHealthApplication } from '../app-health.types';
import { applicationColumnsConfig } from './application.columns-config';
import { ApplicationService } from './application.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationPaginationResolver: ResolveFn<GridData<AppHealthApplication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'appHealth::application.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::application.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::application.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::application.list.export');

    return applicationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::application.detail.new',
        isViewAction: true,
    });
};

export const applicationEditResolver: ResolveFn<{
    object: AppHealthApplication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'appHealth::application.detail.edit',
        isViewAction: true,
    });

    return applicationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
