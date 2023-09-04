import { AppHealthDatabase } from '../app-health.types';
import { databaseColumnsConfig } from './database.columns-config';
import { DatabaseService } from './database.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const databasePaginationResolver: ResolveFn<GridData<AppHealthDatabase>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const databaseService = inject(DatabaseService);

    actionService.action({
        id          : 'appHealth::database.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::database.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::database.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::database.list.export');

    return databaseService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: databaseColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const databaseNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::database.detail.new',
        isViewAction: true,
    });
};

export const databaseEditResolver: ResolveFn<{
    object: AppHealthDatabase;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const databaseService = inject(DatabaseService);

    actionService.action({
        id          : 'appHealth::database.detail.edit',
        isViewAction: true,
    });

    return databaseService
        .findById({
            id: route.paramMap.get('id'),
        });
};
