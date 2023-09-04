import { MatSelectModule } from '@angular/material/select';
import { AppHealthApplication, AppHealthApplicationAuthorization, AppHealthApplicationInfrastructureService, AppHealthAuthorizationInterface } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { AuthorizationInterfaceService } from '../authorization-interface/authorization-interface.service';
import { ApplicationAuthorizationService } from './application-authorization.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
    selector       : 'app-health-application-authorization-detail',
    templateUrl    : './application-authorization-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
        NgForOf,
    ],
})
export class ApplicationAuthorizationDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationAuthorization;

    // relationships
    applications$: Observable<AppHealthApplication[]>;
    authorizationInterfaces$: Observable<AppHealthAuthorizationInterface[]>;
    applicationInfrastuctureServices$: Observable<AppHealthApplicationInfrastructureService[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationAuthorizations', routerLink: ['/app-health/application-authorization']},
        { translation: 'appHealth.ApplicationAuthorization' },
    ];

    constructor(
        private readonly applicationAuthorizationService: ApplicationAuthorizationService,
        private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
        private readonly applicationService: ApplicationService,
        private readonly authorizationInterfaceService: AuthorizationInterfaceService,
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
        this.authorizationInterfaces$ = this.authorizationInterfaceService.authorizationInterfaces$;
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
                    'appHealth::applicationAuthorization.detail.new' : 'appHealth::applicationAuthorization.detail.create',
                    'appHealth::applicationAuthorization.detail.edit': 'appHealth::applicationAuthorization.detail.update',
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
            authorizationInterfaceId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            totalUsers: [null, [Validators.maxLength(10)]],
            score: [null, [Validators.required, Validators.maxLength(10)]],
            applicationInfrastructureServiceId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationAuthorization.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationAuthorization.detail.edit':
                this.applicationAuthorizationService
                    .applicationAuthorization$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationAuthorization.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationAuthorizationService
                            .create<AppHealthApplicationAuthorization>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationAuthorization')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-authorization']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationAuthorization.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationAuthorizationService
                            .updateById<AppHealthApplicationAuthorization>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationAuthorization')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-authorization']);
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
