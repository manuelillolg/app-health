import { AppHealthApplication, AppHealthTechnicalSolution } from '../app-health.types';
import { TechnicalSolutionService } from '../technical-solution/technical-solution.service';
import { applicationColumnsConfig } from './application.columns-config';
import { ApplicationService } from './application.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationPaginationResolver: ResolveFn<GridData<AppHealthApplication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'appHealth::application.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::application.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::application.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::application.list.export');

    return applicationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationNewResolver: ResolveFn<{
    appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'appHealth::application.detail.new',
        isViewAction: true,
    });

    return applicationService.getRelations();
};

export const applicationEditResolver: ResolveFn<{
    appHealthGetTechnicalSolutions: AppHealthTechnicalSolution[];
    object: AppHealthApplication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationService = inject(ApplicationService);

    actionService.action({
        id          : 'appHealth::application.detail.edit',
        isViewAction: true,
    });

    return applicationService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
