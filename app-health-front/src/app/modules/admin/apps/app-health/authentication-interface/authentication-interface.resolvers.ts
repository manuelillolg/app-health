import { AppHealthAuthenticationInterface } from '../app-health.types';
import { authenticationInterfaceColumnsConfig } from './authentication-interface.columns-config';
import { AuthenticationInterfaceService } from './authentication-interface.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const authenticationInterfacePaginationResolver: ResolveFn<GridData<AppHealthAuthenticationInterface>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const authenticationInterfaceService = inject(AuthenticationInterfaceService);

    actionService.action({
        id          : 'appHealth::authenticationInterface.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::authenticationInterface.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::authenticationInterface.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::authenticationInterface.list.export');

    return authenticationInterfaceService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: authenticationInterfaceColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const authenticationInterfaceNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::authenticationInterface.detail.new',
        isViewAction: true,
    });
};

export const authenticationInterfaceEditResolver: ResolveFn<{
    object: AppHealthAuthenticationInterface;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const authenticationInterfaceService = inject(AuthenticationInterfaceService);

    actionService.action({
        id          : 'appHealth::authenticationInterface.detail.edit',
        isViewAction: true,
    });

    return authenticationInterfaceService
        .findById({
            id: route.paramMap.get('id'),
        });
};
