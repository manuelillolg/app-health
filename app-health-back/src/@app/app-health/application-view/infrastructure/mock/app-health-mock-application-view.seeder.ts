import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    AppHealthApplicationViewId,
    AppHealthApplicationViewApplicationId,
    AppHealthApplicationViewTotalViews,
    AppHealthApplicationViewComplexity,
    AppHealthApplicationViewDescription,
    AppHealthApplicationViewScore,
    AppHealthApplicationViewCreatedAt,
    AppHealthApplicationViewUpdatedAt,
    AppHealthApplicationViewDeletedAt,
} from '../../domain/value-objects';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';
import { appHealthMockApplicationViewData } from './app-health-mock-application-view.data';
import * as _ from 'lodash';

@Injectable()
export class AppHealthMockApplicationViewSeeder extends MockSeeder<AppHealthApplicationView>
{
    public collectionSource: AppHealthApplicationView[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const applicationView of _.orderBy(appHealthMockApplicationViewData, ['id']))
        {
            this.collectionSource.push(
                AppHealthApplicationView.register(
                    new AppHealthApplicationViewId(applicationView.id),
                    new AppHealthApplicationViewApplicationId(applicationView.applicationId),
                    new AppHealthApplicationViewTotalViews(applicationView.totalViews),
                    new AppHealthApplicationViewComplexity(applicationView.complexity),
                    new AppHealthApplicationViewDescription(applicationView.description),
                    new AppHealthApplicationViewScore(applicationView.score),
                    new AppHealthApplicationViewCreatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationViewUpdatedAt({ currentTimestamp: true }),
                    new AppHealthApplicationViewDeletedAt(null),
                ),
            );
        }
    }
}
