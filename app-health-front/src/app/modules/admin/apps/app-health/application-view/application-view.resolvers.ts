import { AppHealthApplication, AppHealthApplicationView } from '../app-health.types';
import { ApplicationService } from '../application/application.service';
import { applicationViewColumnsConfig } from './application-view.columns-config';
import { ApplicationViewService } from './application-view.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationViewPaginationResolver: ResolveFn<GridData<AppHealthApplicationView>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationViewService = inject(ApplicationViewService);

    actionService.action({
        id          : 'appHealth::applicationView.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationView.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationView.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationView.list.export');

    return applicationViewService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationViewColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationViewNewResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationViewService = inject(ApplicationViewService);

    actionService.action({
        id          : 'appHealth::applicationView.detail.new',
        isViewAction: true,
    });

    return applicationViewService.getRelations();
};

export const applicationViewEditResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
    object: AppHealthApplicationView;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationViewService = inject(ApplicationViewService);

    actionService.action({
        id          : 'appHealth::applicationView.detail.edit',
        isViewAction: true,
    });

    return applicationViewService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
