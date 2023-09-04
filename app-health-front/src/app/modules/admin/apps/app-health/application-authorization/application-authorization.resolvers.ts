import { AppHealthApplication, AppHealthApplicationAuthorization, AppHealthApplicationInfrastructureService, AppHealthAuthorizationInterface } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { AuthorizationInterfaceService } from '../authorization-interface/authorization-interface.service';
import { applicationAuthorizationColumnsConfig } from './application-authorization.columns-config';
import { ApplicationAuthorizationService } from './application-authorization.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const applicationAuthorizationPaginationResolver: ResolveFn<GridData<AppHealthApplicationAuthorization>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const applicationAuthorizationService = inject(ApplicationAuthorizationService);

    actionService.action({
        id          : 'appHealth::applicationAuthorization.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::applicationAuthorization.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::applicationAuthorization.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::applicationAuthorization.list.export');

    return applicationAuthorizationService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: applicationAuthorizationColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const applicationAuthorizationNewResolver: ResolveFn<{
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationAuthorizationService = inject(ApplicationAuthorizationService);

    actionService.action({
        id          : 'appHealth::applicationAuthorization.detail.new',
        isViewAction: true,
    });

    return applicationAuthorizationService.getRelations();
};

export const applicationAuthorizationEditResolver: ResolveFn<{
    appHealthGetApplicationInfrastuctureServices: AppHealthApplicationInfrastructureService[];
    appHealthGetApplications: AppHealthApplication[];
    appHealthGetAuthorizationInterfaces: AppHealthAuthorizationInterface[];
    object: AppHealthApplicationAuthorization;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const applicationAuthorizationService = inject(ApplicationAuthorizationService);

    actionService.action({
        id          : 'appHealth::applicationAuthorization.detail.edit',
        isViewAction: true,
    });

    return applicationAuthorizationService
        .findByIdWithRelations({
            id: route.paramMap.get('id'),
        });
};
