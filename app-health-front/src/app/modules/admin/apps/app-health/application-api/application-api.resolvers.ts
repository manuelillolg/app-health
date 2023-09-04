import { ApiInterfaceTypeService } from '../api-interface-type/api-interface-type.service';
import { AppHealthApiInterfaceType, AppHealthApplication, AppHealthApplicationApi, AppHealthApplicationInfrastructureService } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
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

export const applicationApiNewResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetApiInterfaceTypes: AppHealthApiInterfaceType[];
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationApiService = inject(ApplicationApiService);

    actionService.action({
        id          : 'appHealth::applicationApi.detail.new',
        isViewAction: true,
    });

    return applicationApiService.getRelations();
};

export const applicationApiEditResolver: ResolveFn<{
    appHealthGetApiInterfaceTypes: AppHealthApiInterfaceType[];
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    appHealthGetApplications: AppHealthApplication[];
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
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
