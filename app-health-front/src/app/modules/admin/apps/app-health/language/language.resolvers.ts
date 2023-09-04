import { AppHealthLanguage } from '../app-health.types';
import { languageColumnsConfig } from './language.columns-config';
import { LanguageService } from './language.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const languagePaginationResolver: ResolveFn<GridData<AppHealthLanguage>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const languageService = inject(LanguageService);

    actionService.action({
        id          : 'appHealth::language.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::language.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::language.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::language.list.export');

    return languageService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: languageColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const languageNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::language.detail.new',
        isViewAction: true,
    });
};

export const languageEditResolver: ResolveFn<{
    object: AppHealthLanguage;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const languageService = inject(LanguageService);

    actionService.action({
        id          : 'appHealth::language.detail.edit',
        isViewAction: true,
    });

    return languageService
        .findById({
            id: route.paramMap.get('id'),
        });
};
