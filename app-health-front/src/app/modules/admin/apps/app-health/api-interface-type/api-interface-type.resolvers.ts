import { AppHealthApiInterfaceType } from '../app-health.types';
import { apiInterfaceTypeColumnsConfig } from './api-interface-type.columns-config';
import { ApiInterfaceTypeService } from './api-interface-type.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const apiInterfaceTypePaginationResolver: ResolveFn<GridData<AppHealthApiInterfaceType>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const apiInterfaceTypeService = inject(ApiInterfaceTypeService);

    actionService.action({
        id          : 'appHealth::apiInterfaceType.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::apiInterfaceType.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::apiInterfaceType.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::apiInterfaceType.list.export');

    return apiInterfaceTypeService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: apiInterfaceTypeColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const apiInterfaceTypeNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::apiInterfaceType.detail.new',
        isViewAction: true,
    });
};

export const apiInterfaceTypeEditResolver: ResolveFn<{
    object: AppHealthApiInterfaceType;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const apiInterfaceTypeService = inject(ApiInterfaceTypeService);

    actionService.action({
        id          : 'appHealth::apiInterfaceType.detail.edit',
        isViewAction: true,
    });

    return apiInterfaceTypeService
        .findById({
            id: route.paramMap.get('id'),
        });
};
