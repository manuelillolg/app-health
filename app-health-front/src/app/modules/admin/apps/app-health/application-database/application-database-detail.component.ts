import { AppHealthApplication, AppHealthApplicationDatabase, AppHealthApplicationInfrastructureService, AppHealthDatabase } from '../app-health.types';
import { ApplicationInfrastructureServiceService } from '../application-infrastructure-service/application-infrastructure-service.service';
import { ApplicationService } from '../application/application.service';
import { DatabaseService } from '../database/database.service';
import { ApplicationDatabaseService } from './application-database.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector       : 'app-health-application-database-detail',
    templateUrl    : './application-database-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
        NgForOf,
    ],
})
export class ApplicationDatabaseDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationDatabase;

    // relationships
    applications$: Observable<AppHealthApplication[]>;
    databases$: Observable<AppHealthDatabase[]>;
applicationInfrastuctureServices$: Observable<AppHealthApplicationInfrastructureService[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationDatabases', routerLink: ['/app-health/application-database']},
        { translation: 'appHealth.ApplicationDatabase' },
    ];

    constructor(
        private readonly applicationDatabaseService: ApplicationDatabaseService,
private readonly applicationInfrastructureServiceService: ApplicationInfrastructureServiceService,
        private readonly applicationService: ApplicationService,
        private readonly databaseService: DatabaseService,
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
        this.databases$ = this.databaseService.databases$;
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
                    'appHealth::applicationDatabase.detail.new' : 'appHealth::applicationDatabase.detail.create',
                    'appHealth::applicationDatabase.detail.edit': 'appHealth::applicationDatabase.detail.update',
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
            databaseId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            version: ['', [Validators.required, Validators.maxLength(20)]],
            size: [null, [Validators.maxLength(6)]],
            score: [null, [Validators.required, Validators.maxLength(6)]],
            totalCollectionsTables: [null, [Validators.maxLength(10)]],
            totalFields: [null, [Validators.maxLength(10)]],
            applicationInfrastructureServiceId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationDatabase.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationDatabase.detail.edit':
                this.applicationDatabaseService
                    .applicationDatabase$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationDatabase.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationDatabaseService
                            .create<AppHealthApplicationDatabase>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationDatabase')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-database']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationDatabase.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationDatabaseService
                            .updateById<AppHealthApplicationDatabase>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationDatabase')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-database']);
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
