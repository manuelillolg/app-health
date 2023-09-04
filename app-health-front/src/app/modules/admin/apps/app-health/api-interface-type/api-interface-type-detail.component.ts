import { AppHealthApiInterfaceType } from '../app-health.types';
import { ApiInterfaceTypeService } from './api-interface-type.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, takeUntil } from 'rxjs';

@Component({
    selector       : 'app-health-api-interface-type-detail',
    templateUrl    : './api-interface-type-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
    ],
})
export class ApiInterfaceTypeDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApiInterfaceType;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApiInterfaceTypes', routerLink: ['/app-health/api-interface-type']},
        { translation: 'appHealth.ApiInterfaceType' },
    ];

    constructor(
        private readonly apiInterfaceTypeService: ApiInterfaceTypeService,
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
                    'appHealth::apiInterfaceType.detail.new' : 'appHealth::apiInterfaceType.detail.create',
                    'appHealth::apiInterfaceType.detail.edit': 'appHealth::apiInterfaceType.detail.update',
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
            score: [null, [Validators.required, Validators.maxLength(6)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::apiInterfaceType.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::apiInterfaceType.detail.edit':
                this.apiInterfaceTypeService
                    .apiInterfaceType$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::apiInterfaceType.detail.create':
                try
                {
                    await lastValueFrom(
                        this.apiInterfaceTypeService
                            .create<AppHealthApiInterfaceType>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApiInterfaceType')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/api-interface-type']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::apiInterfaceType.detail.update':
                try
                {
                    await lastValueFrom(
                        this.apiInterfaceTypeService
                            .updateById<AppHealthApiInterfaceType>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApiInterfaceType')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/api-interface-type']);
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
