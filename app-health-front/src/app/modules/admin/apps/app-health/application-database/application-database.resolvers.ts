import { AppHealthApplication, AppHealthApplicationDatabase, AppHealthApplicationInfrastructureService, AppHealthDatabase } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { DatabaseService } from '../database/database.service';
import { applicationDatabaseColumnsConfig } from './application-database.columns-config';
import { ApplicationDatabaseService } from './application-database.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationDatabasePaginationResolver: ResolveFn<GridData<AppHealthApplicationDatabase>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationDatabaseService = inject(ApplicationDatabaseService);

    actionService.action({
        id          : 'appHealth::applicationDatabase.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationDatabase.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationDatabase.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationDatabase.list.export');

    return applicationDatabaseService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationDatabaseColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationDatabaseNewResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetDatabases: AppHealthDatabase[];
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationDatabaseService = inject(ApplicationDatabaseService);

    actionService.action({
        id          : 'appHealth::applicationDatabase.detail.new',
        isViewAction: true,
    });

    return applicationDatabaseService.getRelations();
};

export const applicationDatabaseEditResolver: ResolveFn<{
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetDatabases: AppHealthDatabase[];
    object: AppHealthApplicationDatabase;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationDatabaseService = inject(ApplicationDatabaseService);

    actionService.action({
        id          : 'appHealth::applicationDatabase.detail.edit',
        isViewAction: true,
    });

    return applicationDatabaseService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
