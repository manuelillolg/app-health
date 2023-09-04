import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationLanguageRepository } from '@app/app-health/application-language/domain/app-health-application-language.repository';
import {
    AppHealthApplicationLanguageId,
    AppHealthApplicationLanguageApplicationId,
    AppHealthApplicationLanguageLanguageId,
    AppHealthApplicationLanguageVersion,
    AppHealthApplicationLanguageScore,
    AppHealthApplicationLanguageCodeQualityScore,
    AppHealthApplicationLanguageCreatedAt,
    AppHealthApplicationLanguageUpdatedAt,
    AppHealthApplicationLanguageDeletedAt,
} from '@app/app-health/application-language/domain/value-objects';
import { AppHealthApplicationLanguage } from '../../domain/app-health-application-language.aggregate';
import { appHealthMockApplicationLanguageData } from './app-health-mock-application-language.data';

@Injectable()
export class AppHealthMockApplicationLanguageRepository extends MockRepository<AppHealthApplicationLanguage> implements AppHealthIApplicationLanguageRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationLanguage';
    public collectionSource: AppHealthApplicationLanguage[];
    public deletedAtInstance: AppHealthApplicationLanguageDeletedAt = new AppHealthApplicationLanguageDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationLanguageData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationLanguage.register(
                new AppHealthApplicationLanguageId(itemCollection.id),
                new AppHealthApplicationLanguageApplicationId(itemCollection.applicationId),
                new AppHealthApplicationLanguageLanguageId(itemCollection.languageId),
                new AppHealthApplicationLanguageVersion(itemCollection.version),
                new AppHealthApplicationLanguageScore(itemCollection.score),
                new AppHealthApplicationLanguageCodeQualityScore(itemCollection.codeQualityScore),
                new AppHealthApplicationLanguageCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationLanguageUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationLanguageDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
