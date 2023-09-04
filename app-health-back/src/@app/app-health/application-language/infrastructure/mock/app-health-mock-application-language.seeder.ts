import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { AppHealthApplicationLanguage } from '../../domain/app-health-application-language.aggregate';
import { appHealthMockApplicationLanguageData } from './app-health-mock-application-language.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationLanguageSeeder extends MockSeeder<AppHealthApplicationLanguage>
{
    public collectionSource: AppHealthApplicationLanguage[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationLanguage of _.orderBy(appHealthMockApplicationLanguageData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationLanguage.register(
                    new AppHealthApplicationLanguageId(applicationLanguage.id),
                    new AppHealthApplicationLanguageApplicationId(applicationLanguage.applicationId),
                    new AppHealthApplicationLanguageLanguageId(applicationLanguage.languageId),
                    new AppHealthApplicationLanguageVersion(applicationLanguage.version),
                    new AppHealthApplicationLanguageScore(applicationLanguage.score),
                    new AppHealthApplicationLanguageCodeQualityScore(applicationLanguage.codeQualityScore),
                    new AppHealthApplicationLanguageCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationLanguageUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationLanguageDeletedAt(null),
                ),
            );
        }
    }
}
