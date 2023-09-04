import { AppHealthApplicationIntegration } from '../app-health.types';
import { applicationIntegrationColumnsConfig } from './application-integration.columns-config';
import { ApplicationIntegrationService } from './application-integration.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationIntegrationPaginationResolver: ResolveFn<GridData<AppHealthApplicationIntegration>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationIntegrationService = inject(ApplicationIntegrationService);

    actionService.action({
        id          : 'appHealth::applicationIntegration.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationIntegration.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationIntegration.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationIntegration.list.export');

    return applicationIntegrationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationIntegrationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationIntegrationNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::applicationIntegration.detail.new',
        isViewAction: true,
    });
};

export const applicationIntegrationEditResolver: ResolveFn<{
    object: AppHealthApplicationIntegration;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationIntegrationService = inject(ApplicationIntegrationService);

    actionService.action({
        id          : 'appHealth::applicationIntegration.detail.edit',
        isViewAction: true,
    });

    return applicationIntegrationService
        .findById({
            id: route.paramMap.get('id'),
        });
};
