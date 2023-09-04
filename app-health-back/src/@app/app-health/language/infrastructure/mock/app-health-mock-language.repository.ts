import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthILanguageRepository } from '@app/app-health/language/domain/app-health-language.repository';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '@app/app-health/language/domain/value-objects';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';
import { appHealthMockLanguageData } from './app-health-mock-language.data';

@Injectable()
export class AppHealthMockLanguageRepository extends MockRepository<AppHealthLanguage> implements AppHealthILanguageRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthLanguage';
    public collectionSource: AppHealthLanguage[];
    public deletedAtInstance: AppHealthLanguageDeletedAt = new AppHealthLanguageDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>appHealthMockLanguageData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthLanguage.register(
                new AppHealthLanguageId(itemCollection.id),
                new AppHealthLanguageName(itemCollection.name),
                new AppHealthLanguageVersions(itemCollection.versions),
                new AppHealthLanguageCreatedAt(itemCollection.createdAt),
                new AppHealthLanguageUpdatedAt(itemCollection.updatedAt),
                new AppHealthLanguageDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
