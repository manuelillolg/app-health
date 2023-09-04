import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { AppHealthIApplicationViewRepository } from '@app/app-health/application-view/domain/app-health-application-view.repository';
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
} from '@app/app-health/application-view/domain/value-objects';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';
import { appHealthMockApplicationViewData } from './app-health-mock-application-view.data';

@Injectable()
export class AppHealthMockApplicationViewRepository extends MockRepository<AppHealthApplicationView> implements AppHealthIApplicationViewRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'AppHealthApplicationView';
    public collectionSource: AppHealthApplicationView[];
    public deletedAtInstance: AppHealthApplicationViewDeletedAt = new AppHealthApplicationViewDeletedAt(null);

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

        for (const itemCollection of <any[]>appHealthMockApplicationViewData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(AppHealthApplicationView.register(
                new AppHealthApplicationViewId(itemCollection.id),
                new AppHealthApplicationViewApplicationId(itemCollection.applicationId),
                new AppHealthApplicationViewTotalViews(itemCollection.totalViews),
                new AppHealthApplicationViewComplexity(itemCollection.complexity),
                new AppHealthApplicationViewDescription(itemCollection.description),
                new AppHealthApplicationViewScore(itemCollection.score),
                new AppHealthApplicationViewCreatedAt(itemCollection.createdAt),
                new AppHealthApplicationViewUpdatedAt(itemCollection.updatedAt),
                new AppHealthApplicationViewDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
