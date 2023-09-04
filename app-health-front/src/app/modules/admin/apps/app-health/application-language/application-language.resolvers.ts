import { AppHealthApplicationLanguage } from '../app-health.types';
import { applicationLanguageColumnsConfig } from './application-language.columns-config';
import { ApplicationLanguageService } from './application-language.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationLanguagePaginationResolver: ResolveFn<GridData<AppHealthApplicationLanguage>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationLanguageService = inject(ApplicationLanguageService);

    actionService.action({
        id          : 'appHealth::applicationLanguage.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationLanguage.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationLanguage.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationLanguage.list.export');

    return applicationLanguageService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationLanguageColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationLanguageNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::applicationLanguage.detail.new',
        isViewAction: true,
    });
};

export const applicationLanguageEditResolver: ResolveFn<{
    object: AppHealthApplicationLanguage;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationLanguageService = inject(ApplicationLanguageService);

    actionService.action({
        id          : 'appHealth::applicationLanguage.detail.edit',
        isViewAction: true,
    });

    return applicationLanguageService
        .findById({
            id: route.paramMap.get('id'),
        });
};
