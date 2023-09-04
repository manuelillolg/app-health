import { AppHealthApplication, AppHealthApplicationAuthentication, AppHealthApplicationInfrastructureService, AppHealthAuthenticationInterface } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { AuthenticationInterfaceService } from '../authentication-interface/authentication-interface.service';
import { applicationAuthenticationColumnsConfig } from './application-authentication.columns-config';
import { ApplicationAuthenticationService } from './application-authentication.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationAuthenticationPaginationResolver: ResolveFn<GridData<AppHealthApplicationAuthentication>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationAuthenticationService = inject(ApplicationAuthenticationService);

    actionService.action({
        id          : 'appHealth::applicationAuthentication.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationAuthentication.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationAuthentication.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationAuthentication.list.export');

    return applicationAuthenticationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationAuthenticationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationAuthenticationNewResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationAuthenticationService = inject(ApplicationAuthenticationService);

    actionService.action({
        id          : 'appHealth::applicationAuthentication.detail.new',
        isViewAction: true,
    });

    return applicationAuthenticationService.getRelations();
};

export const applicationAuthenticationEditResolver: ResolveFn<{
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetAuthenticationInterfaces: AppHealthAuthenticationInterface[];
    object: AppHealthApplicationAuthentication;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationAuthenticationService = inject(ApplicationAuthenticationService);

    actionService.action({
        id          : 'appHealth::applicationAuthentication.detail.edit',
        isViewAction: true,
    });

    return applicationAuthenticationService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
