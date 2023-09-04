import { AppHealthCustomer } from '../app-health.types';
import { customerColumnsConfig } from './customer.columns-config';
import { CustomerService } from './customer.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Action, ActionService, GridData, GridFiltersStorageService, GridStateService, QueryStatementHandler } from '@aurora';

export const customerPaginationResolver: ResolveFn<GridData<AppHealthCustomer>> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const gridFiltersStorageService = inject(GridFiltersStorageService);
    const gridStateService = inject(GridStateService);
    const customerService = inject(CustomerService);

    actionService.action({
        id          : 'appHealth::customer.list.view',
        isViewAction: true,
    });

    const gridId = 'appHealth::customer.list.mainGridList';
    gridStateService.setPaginationActionId(gridId, 'appHealth::customer.list.pagination');
    gridStateService.setExportActionId(gridId, 'appHealth::customer.list.export');

    return customerService.pagination({
        query: QueryStatementHandler
            .init({ columnsConfig: customerColumnsConfig })
            .setColumFilters(gridFiltersStorageService.getColumnFilterState(gridId))
            .setSort(gridStateService.getSort(gridId))
            .setPage(gridStateService.getPage(gridId))
            .setSearch(gridStateService.getSearchState(gridId))
            .getQueryStatement(),
    });
};

export const customerNewResolver: ResolveFn<Action> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);

    return actionService.action({
        id          : 'appHealth::customer.detail.new',
        isViewAction: true,
    });
};

export const customerEditResolver: ResolveFn<{
    object: AppHealthCustomer;
}> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) =>
{
    const actionService = inject(ActionService);
    const customerService = inject(CustomerService);

    actionService.action({
        id          : 'appHealth::customer.detail.edit',
        isViewAction: true,
    });

    return customerService
        .findById({
            id: route.paramMap.get('id'),
        });
};
