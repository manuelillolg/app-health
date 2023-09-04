import { AppHealthApplicationIntegration } from '../app-health.types';
import { ApplicationIntegrationService } from './application-integration.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'app-health-application-integration-detail',
    templateUrl    : './application-integration-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
    ],
})
export class ApplicationIntegrationDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationIntegration;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationIntegrations', routerLink: ['/app-health/application-integration']},
        { translation: 'appHealth.ApplicationIntegration' },
    ];

    constructor(
        private readonly applicationIntegrationService: ApplicationIntegrationService,
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
                    'appHealth::applicationIntegration.detail.new' : 'appHealth::applicationIntegration.detail.create',
                    'appHealth::applicationIntegration.detail.edit': 'appHealth::applicationIntegration.detail.update',
                },
            ),
            isViewAction: false,
        });
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            name: ['', [Validators.required, Validators.maxLength(255)]],
            description: '',
            sourceApplicationId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            targetApplicationId: ['', [Validators.minLength(36), Validators.maxLength(36)]],
            apiInterfaceTypeId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            interfaceNumbers: [null, [Validators.maxLength(10)]],
            modality: [null, [Validators.required]],
            score: [null, [Validators.required, Validators.maxLength(6)]],
            documentations: null,
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationIntegration.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationIntegration.detail.edit':
                this.applicationIntegrationService
                    .applicationIntegration$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationIntegration.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationIntegrationService
                            .create<AppHealthApplicationIntegration>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationIntegration')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-integration']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationIntegration.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationIntegrationService
                            .updateById<AppHealthApplicationIntegration>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationIntegration')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-integration']);
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
