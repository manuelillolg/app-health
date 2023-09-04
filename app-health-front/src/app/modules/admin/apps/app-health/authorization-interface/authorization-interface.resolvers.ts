import { AppHealthAuthorizationInterface } from '../app-health.types';
import { authorizationInterfaceColumnsConfig } from './authorization-interface.columns-config';
import { AuthorizationInterfaceService } from './authorization-interface.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const authorizationInterfacePaginationResolver: ResolveFn<GridData<AppHealthAuthorizationInterface>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const authorizationInterfaceService = inject(AuthorizationInterfaceService);

    actionService.action({
        id          : 'appHealth::authorizationInterface.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::authorizationInterface.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::authorizationInterface.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::authorizationInterface.list.export');

    return authorizationInterfaceService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: authorizationInterfaceColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const authorizationInterfaceNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::authorizationInterface.detail.new',
        isViewAction: true,
    });
};

export const authorizationInterfaceEditResolver: ResolveFn<{
    object: AppHealthAuthorizationInterface;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const authorizationInterfaceService = inject(AuthorizationInterfaceService);

    actionService.action({
        id          : 'appHealth::authorizationInterface.detail.edit',
        isViewAction: true,
    });

    return authorizationInterfaceService
        .findById({
            id: route.paramMap.get('id'),
        });
};
