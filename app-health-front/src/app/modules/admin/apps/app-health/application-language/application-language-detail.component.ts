import { MatSelectModule } from '@angular/material/select';
import { AppHealthApplication, AppHealthApplicationLanguage, AppHealthLanguage } from '../app-health.types';
import { ApplicationService } from '../application/application.service';
import { LanguageService } from '../language/language.service';
import { ApplicationLanguageService } from './application-language.service';
import { ChangeDetectionStrategy, Component, Injector, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { Action, Crumb, defaultDetailImports, log, mapActions, Utils, ViewDetailComponent } from '@aurora';
import { lastValueFrom, Observable, takeUntil } from 'rxjs';
import { NgForOf } from '@angular/common';

@Component({
    selector       : 'app-health-application-language-detail',
    templateUrl    : './application-language-detail.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [
        ...defaultDetailImports,
        MatSelectModule,
        NgForOf,
    ],
})
export class ApplicationLanguageDetailComponent extends ViewDetailComponent
{
    // ---- customizations ----
    // ..

    // Object retrieved from the database request,
    // it should only be used to obtain uninitialized
    // data in the form, such as relations, etc.
    // It should not be used habitually, since the source of truth is the form.
    managedObject: AppHealthApplicationLanguage;

    // relationships
    applications$: Observable<AppHealthApplication[]>;
    languages$: Observable<AppHealthLanguage[]>;

    // breadcrumb component definition
    breadcrumb: Crumb[] = [
        { translation: 'App' },
        { translation: 'appHealth.ApplicationLanguages', routerLink: ['/app-health/application-language']},
        { translation: 'appHealth.ApplicationLanguage' },
    ];

    constructor(
        private readonly applicationLanguageService: ApplicationLanguageService,
        private readonly applicationService: ApplicationService,
        protected readonly injector: Injector,
        private readonly languageService: LanguageService,
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
        this.languages$ = this.languageService.languages$;
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
                    'appHealth::applicationLanguage.detail.new' : 'appHealth::applicationLanguage.detail.create',
                    'appHealth::applicationLanguage.detail.edit': 'appHealth::applicationLanguage.detail.update',
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
            languageId: ['', [Validators.required, Validators.minLength(36), Validators.maxLength(36)]],
            version: ['', [Validators.required, Validators.maxLength(20)]],
            score: [null, [Validators.required, Validators.maxLength(6)]],
            codeQualityScore: [null, [Validators.required, Validators.maxLength(6)]],
        });
    }

    async handleAction(action: Action): Promise<void>
    {
        // add optional chaining (?.) to avoid first call where behaviour subject is undefined
        switch (action?.id)
        {
            /* #region common actions */
            case 'appHealth::applicationLanguage.detail.new':
                this.fg.get('id').setValue(Utils.uuid());
                break;

            case 'appHealth::applicationLanguage.detail.edit':
                this.applicationLanguageService
                    .applicationLanguage$
                    .pipe(takeUntil(this.unsubscribeAll$))
                    .subscribe(item =>
                    {
                        this.managedObject = item;
                        this.fg.patchValue(item);
                    });
                break;

            case 'appHealth::applicationLanguage.detail.create':
                try
                {
                    await lastValueFrom(
                        this.applicationLanguageService
                            .create<AppHealthApplicationLanguage>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationLanguage')} ${this.translocoService.translate('Created.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-language']);
                }
                catch(error)
                {
                    log(`[DEBUG] Catch error in ${action.id} action: ${error}`);
                }
                break;

            case 'appHealth::applicationLanguage.detail.update':
                try
                {
                    await lastValueFrom(
                        this.applicationLanguageService
                            .updateById<AppHealthApplicationLanguage>({
                                object: this.fg.value,
                            }),
                    );

                    this.snackBar.open(
                        `${this.translocoService.translate('appHealth.ApplicationLanguage')} ${this.translocoService.translate('Saved.M')}`,
                        undefined,
                        {
                            verticalPosition: 'top',
                            duration        : 3000,
                        },
                    );

                    this.router.navigate(['app-health/application-language']);
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
