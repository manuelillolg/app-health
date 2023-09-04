import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';
import { AppHealthCreatedLanguageEvent } from './app-health-created-language.event';
import { AppHealthCreatedLanguagesEvent } from './app-health-created-languages.event';
import { AppHealthUpdatedLanguageEvent } from './app-health-updated-language.event';
import { AppHealthUpdatedLanguagesEvent } from './app-health-updated-languages.event';
import { AppHealthDeletedLanguageEvent } from './app-health-deleted-language.event';
import { AppHealthDeletedLanguagesEvent } from './app-health-deleted-languages.event';

export class AppHealthAddLanguagesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthLanguage[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new AppHealthCreatedLanguagesEvent(
                this.aggregateRoots.map(language =>
                    new AppHealthCreatedLanguageEvent(
                        language.id.value,
                        language.name.value,
                        language.versions.value,
                        language.createdAt?.value,
                        language.updatedAt?.value,
                        language.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedLanguagesEvent(
                this.aggregateRoots.map(language =>
                    new AppHealthUpdatedLanguageEvent(
                        language.id.value,
                        language.name.value,
                        language.versions.value,
                        language.createdAt?.value,
                        language.updatedAt?.value,
                        language.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedLanguagesEvent(
                this.aggregateRoots.map(language =>
                    new AppHealthDeletedLanguageEvent(
                        language.id.value,
                        language.name.value,
                        language.versions.value,
                        language.createdAt?.value,
                        language.updatedAt?.value,
                        language.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
