import { AppHealthApplicationInfrastructureService } from '../app-health.types';
import { applicationInfrastructureServiceColumnsConfig } from './application-infrastructure-service.columns-config';
import { ApplicationInfrastructureServiceService } from './application-infrastructure-service.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationInfrastructureServicePaginationResolver: ResolveFn<GridData<AppHealthApplicationInfrastructureService>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationInfrastructureServiceService = inject(ApplicationInfrastructureServiceService);

    actionService.action({
        id          : 'appHealth::applicationInfrastructureService.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationInfrastructureService.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationInfrastructureService.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationInfrastructureService.list.export');

    return applicationInfrastructureServiceService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationInfrastructureServiceColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationInfrastructureServiceNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::applicationInfrastructureService.detail.new',
        isViewAction: true,
    });
};

export const applicationInfrastructureServiceEditResolver: ResolveFn<{
    object: AppHealthApplicationInfrastructureService;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationInfrastructureServiceService = inject(ApplicationInfrastructureServiceService);

    actionService.action({
        id          : 'appHealth::applicationInfrastructureService.detail.edit',
        isViewAction: true,
    });

    return applicationInfrastructureServiceService
        .findById({
            id: route.paramMap.get('id'),
        });
};
