import { AppHealthTechnicalSolution } from '../app-health.types';
import { technicalSolutionColumnsConfig } from './technical-solution.columns-config';
import { TechnicalSolutionService } from './technical-solution.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const technicalSolutionPaginationResolver: ResolveFn<GridData<AppHealthTechnicalSolution>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const technicalSolutionService = inject(TechnicalSolutionService);

    actionService.action({
        id          : 'appHealth::technicalSolution.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::technicalSolution.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::technicalSolution.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::technicalSolution.list.export');

    return technicalSolutionService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: technicalSolutionColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const technicalSolutionNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::technicalSolution.detail.new',
        isViewAction: true,
    });
};

export const technicalSolutionEditResolver: ResolveFn<{
    object: AppHealthTechnicalSolution;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const technicalSolutionService = inject(TechnicalSolutionService);

    actionService.action({
        id          : 'appHealth::technicalSolution.detail.edit',
        isViewAction: true,
    });

    return technicalSolutionService
        .findById({
            id: route.paramMap.get('id'),
        });
};
