import { AppHealthApplicationAuthentication } from '../app-health.types';
import { applicationAuthenticationColumnsConfig } from './application-authentication.columns-config';
import { ApplicationAuthenticationService } from './application-authentication.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationAuthenticationPaginationResolver: ResolveFn<GridData<AppHealthApplicationAuthentication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationAuthenticationService = inject(ApplicationAuthenticationService);

    actionService.action({
        id          : 'appHealth::applicationAuthentication.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationAuthentication.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationAuthentication.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationAuthentication.list.export');

    return applicationAuthenticationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationAuthenticationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationAuthenticationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::applicationAuthentication.detail.new',
        isViewAction: true,
    });
};

export const applicationAuthenticationEditResolver: ResolveFn<{
    object: AppHealthApplicationAuthentication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationAuthenticationService = inject(ApplicationAuthenticationService);

    actionService.action({
        id          : 'appHealth::applicationAuthentication.detail.edit',
        isViewAction: true,
    });

    return applicationAuthenticationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
