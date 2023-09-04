import { AppHealthApplicationInfrastructureService } from '../app-health.types';
import { applicationInfrastructureServiceColumnsConfig } from './application-infrastructure-service.columns-config';
import { ApplicationInfrastructureServiceService } from './application-infrastructure-service.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Action, ColumnConfig, ColumnDataType, Crumb, defaultListImports, exportRows, GridColumnsConfigStorageService, GridData, GridFiltersStorageService, GridState, GridStateService, log, QueryStatementHandler, ViewBaseComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';

@Component({
    selector       : 'app-health-application-infrastructure-service-list',
    templateUrl    : './application-infrastructure-service-list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultListImports,
    ],
})
export class ApplicationInfrastructureServiceListComponent extends ViewBaseComponent
{
    // ---- customizations ----
    // ..

    breadcrumb: Crumb[] = [
        { translation: 'App', routerLink: ['/']},
        { translation: 'appHealth.ApplicationInfrastuctureServices' },
    ];
    gridId: string = 'appHealth::applicationInfrastructureService.list.mainGridList';
    gridData$: Observable<GridData<AppHealthApplicationInfrastructureService>>;
    gridState: GridState = {};
    columnsConfig$: Observable<ColumnConfig[]>;
    originColumnsConfig: ColumnConfig[] = [
        {
            type   : ColumnDataType.ACTIONS,
            field  : 'Actions',
            sticky : true,
            actions: row =>
            {
                return [
                    {
                        id         : 'appHealth::applicationInfrastructureService.list.edit',
                        translation: 'edit',
                        icon       : 'mode_edit',
                    },
                    {
                        id         : 'appHealth::applicationInfrastructureService.list.delete',
                        translation: 'delete',
                        icon       : 'delete',
                    },
                ];
            },
        },
        {
            type       : ColumnDataType.CHECKBOX,
            field      : 'select',
            translation: 'Selects',
            sticky     : true,
        },
        ...applicationInfrastructureServiceColumnsConfig,
    ];

    constructor(
        protected readonly injector: Injector,
        private readonly gridColumnsConfigStorageService: GridColumnsConfigStorageService,
        private readonly gridFiltersStorageService: GridFiltersStorageService,
        private readonly gridStateService: GridStateService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    { /**/ }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            case 'appHealth::applicationInfrastructureService.list.view':
                this.columnsConfig$ = this.gridColumnsConfigStorageService
                    .getColumnsConfig(this.gridId, this.originColumnsConfig)
                    .pipe(takeUntil(this.unsubscribeAll$));

                this.gridState = {
                    columnFilters: this.gridFiltersStorageService.getColumnFilterState(this.gridId),
                    page         : this.gridStateService.getPage(this.gridId),
                    sort         : this.gridStateService.getSort(this.gridId),
                    search       : this.gridStateService.getSearchState(this.gridId),
                };

                this.gridData$ = this.applicationInfrastructureServiceService.pagination$;
                break;

            case 'appHealth::applicationInfrastructureService.list.pagination':
                await lastValueFrom(
                    this.applicationInfrastructureServiceService.pagination({
                        query: action.meta.query ?
                            action.meta.query :
                            QueryStatementHandler
                                .init({ columnsConfig: applicationInfrastructureServiceColumnsConfig })
                                .setColumFilters(this.gridFiltersStorageService.getColumnFilterState(this.gridId))
                                .setSort(this.gridStateService.getSort(this.gridId))
                                .setPage(this.gridStateService.getPage(this.gridId))
                                .setSearch(this.gridStateService.getSearchState(this.gridId))
                                .getQueryStatement(),
                    }),
                );
                break;

            case 'appHealth::applicationInfrastructureService.list.edit':
                this.router
                    .navigate([
                        'app-health/application-infrastructure-service/edit',
                        action.meta.row.id,
                    ]);
                break;

            case 'appHealth::applicationInfrastructureService.list.delete':
                const deleteDialogRef = this.confirmationService.open({
                    title  : `${this.translocoService.translate('Delete')} ${this.translocoService.translate('appHealth.ApplicationInfrastructureService')}`,
                    message: this.translocoService.translate('DeletionWarning', { entity: this.translocoService.translate('appHealth.ApplicationInfrastructureService') }),
                    icon   : {
                        show : true,
                        name : 'heroicons_outline:exclamation-triangle',
                        color: 'warn',
                    },
                    actions: {
                        confirm: {
                            show : true,
                            label: this.translocoService.translate('Remove'),
                            color: 'warn',
                        },
                        cancel: {
                            show : true,
                            label: this.translocoService.translate('Cancel'),
                        },
                    },
                    dismissible: true,
                });

                deleteDialogRef.afterClosed()
                    .subscribe(async result =>
                    {
                        if (result === 'confirmed')
                        {
                            try
                            {
                                await lastValueFrom(
                                    this.applicationInfrastructureServiceService
                                        .deleteById<AppHealthApplicationInfrastructureService>({
                                            id: action.meta.row.id,
                                        }),
                                );

                                this.actionService.action({
                                    id          : 'appHealth::applicationInfrastructureService.list.pagination',
                                    isViewAction: false,
                                });
                            }
                            catch(error)
                            {
                                log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                            }
                        }
                    });
                break;

            case 'appHealth::applicationInfrastructureService.list.export':
                const rows = await lastValueFrom(
                    this.applicationInfrastructureServiceService
                        .get({
                            query: action.meta.query,
                        }),
                );

                // format export rows
                (rows.objects as any[]).forEach(row =>
                {
                    // row.id = row.id;
                });

                const columns: string[] = applicationInfrastructureServiceColumnsConfig.map(applicationInfrastructureServiceColumnConfig => applicationInfrastructureServiceColumnConfig.field);
                const headers: string[] = columns.map(column => this.translocoService.translate('appHealth.' + column.toPascalCase()));

                exportRows(
                    rows.objects,
                    'applicationInfrastuctureServices.' + action.meta.format,
                    columns,
                    headers,
                    action.meta.format,
                );
                break;
        }
    }
}
