import { MatSelectModule } from '@angular/material/select';
import { ApiInterfaceTypeService } from '../api-interface-type/api-interface-type.service';
import { AppHealthApiInterfaceType, AppHealthApplication, AppHealthApplicationApi, AppHealthApplicationInfrastructureService } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { ApplicationApiService } from './application-api.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
    selector       : 'app-health-application-api-detail',
    templateUrl    : './application-api-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
        NgForOf,
    ],
})
export class ApplicationApiDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationApi;

    // relationships
    applications$: Observable<AppHealthApplication[]>;
    apiInterfaceTypes$: Observable<AppHealthApiInterfaceType[]>;
    applicationInfrastuctureServices$: Observable<AppHealthApplicationInfrastructureService[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationApis', routerLink: ['/app-health/application-api']},
        { translation: 'appHealth.ApplicationApi' },
    ];

    constructor(
        private readonly apiInterfaceTypeService: ApiInterfaceTypeService,
        private readonly applicationApiService: ApplicationApiService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
        private readonly applicationService: ApplicationService,
        protected readonly injector: Injector,
    )
    {
        super(injector);
    }

    // this method will be called after the ngOnInit of
    // the parent class you can use instead of ngOnInit
    init(): void
    {
        /**/
        this.applications$ = this.applicationService.applications$;
        this.apiInterfaceTypes$ = this.apiInterfaceTypeService.apiInterfaceTypes$;
        this.applicationInfrastuctureServices$ = this.applicationInfrastructureServiceService.applicationInfrastuctureServices$;
    }

    onSubmit($event): void
    {
        // we have two nested forms, we check that the submit comes from the button
        // that corresponds to the main form to the main form
        if ($event.submitter.getAttribute('form') !== $event.submitter.form.getAttribute('id'))
        {
            $event.preventDefault();
            $event.stopPropagation();
            return;
        }

        // manage validations before execute actions
        if (this.fg.invalid)
        {
            log('[DEBUG] Error to validate form: ', this.fg);
            this.validationMessagesService.validate();
            return;
        }

        this.actionService.action({
            id: mapActions(
                this.currentViewAction.id,
                {
                    'appHealth::applicationApi.detail.new' : 'appHealth::applicationApi.detail.create',
                    'appHealth::applicationApi.detail.edit': 'appHealth::applicationApi.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            applicationId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            apiInterfaceTypeId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            score: [null, [Validators.required, Validators.maxLength(6)]],
            documentations: null,
            requestsPerDay: [null, [Validators.maxLength(10)]],
            applicationInfrastructureServiceId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationApi.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationApi.detail.edit':
                this.applicationApiService
                    .applicationApi$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationApi.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationApiService
                            .create<AppHealthApplicationApi>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationApi')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-api']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationApi.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationApiService
                            .updateById<AppHealthApplicationApi>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationApi')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-api']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;
                /* #endregion common actions */
        }
    }
}
