import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthLanguageId,
    AppHealthLanguageName,
    AppHealthLanguageVersions,
    AppHealthLanguageCreatedAt,
    AppHealthLanguageUpdatedAt,
    AppHealthLanguageDeletedAt,
} from '../../domain/value-objects';
import { AppHealthLanguage } from '../../domain/app-health-language.aggregate';
import { appHealthMockLanguageData } from './app-health-mock-language.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockLanguageSeeder extends MockSeeder<AppHealthLanguage>
{
    public collectionSource: AppHealthLanguage[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const language of _.orderBy(appHealthMockLanguageData, ['id']))
        {
            this.collectionSource.push(
                AppHealthLanguage.register(
                    new AppHealthLanguageId(language.id),
                    new AppHealthLanguageName(language.name),
                    new AppHealthLanguageVersions(language.versions),
                    new AppHealthLanguageCreatedAt({ currentTimestamp: true }),
                    new AppHealthLanguageUpdatedAt({ currentTimestamp: true }),
                    new AppHealthLanguageDeletedAt(null),
                ),
            );
        }
    }
}
