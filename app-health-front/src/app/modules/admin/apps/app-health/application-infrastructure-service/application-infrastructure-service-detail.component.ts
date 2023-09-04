import { MatSelectModule } from '@angular/material/select';
import { AppHealthApplication, AppHealthApplicationInfrastructureService, AppHealthInfrastructureService } from '../app-health.types';
import { ApplicationService } from '../application/application.service';
import { InfrastructureServiceService } from '../infrastructure-service/infrastructure-service.service';
import { ApplicationInfrastructureServiceService } from './application-infrastructure-service.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
    selector       : 'app-health-application-infrastructure-service-detail',
    templateUrl    : './application-infrastructure-service-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
        NgForOf,
    ],
})
export class ApplicationInfrastructureServiceDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationInfrastructureService;

    // relationships
    applications$: Observable<AppHealthApplication[]>;
    infrastructureServices$: Observable<AppHealthInfrastructureService[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationInfrastuctureServices', routerLink: ['/app-health/application-infrastructure-service']},
        { translation: 'appHealth.ApplicationInfrastructureService' },
    ];

    constructor(
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
        private readonly applicationService: ApplicationService,
        private readonly infrastructureServiceService: InfrastructureServiceService,
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
        this.infrastructureServices$ = this.infrastructureServiceService.infrastructureServices$;
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
                    'appHealth::applicationInfrastructureService.detail.new' : 'appHealth::applicationInfrastructureService.detail.create',
                    'appHealth::applicationInfrastructureService.detail.edit': 'appHealth::applicationInfrastructureService.detail.update',
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
            infrastructureServiceId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            averageCostPerYear: [null, [Validators.maxLength(10)]],
            score: [null, [Validators.required, Validators.maxLength(6)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationInfrastructureService.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationInfrastructureService.detail.edit':
                this.applicationInfrastructureServiceService
                    .applicationInfrastructureService$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationInfrastructureService.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationInfrastructureServiceService
                            .create<AppHealthApplicationInfrastructureService>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationInfrastructureService')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-infrastructure-service']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationInfrastructureService.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationInfrastructureServiceService
                            .updateById<AppHealthApplicationInfrastructureService>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationInfrastructureService')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-infrastructure-service']);
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
