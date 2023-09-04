import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationView } from '../../domain/app-health-application-view.aggregate';
import { AppHealthCreatedApplicationViewEvent } from './app-health-created-application-view.event';
import { AppHealthCreatedApplicationViewsEvent } from './app-health-created-application-views.event';
import { AppHealthUpdatedApplicationViewEvent } from './app-health-updated-application-view.event';
import { AppHealthUpdatedApplicationViewsEvent } from './app-health-updated-application-views.event';
import { AppHealthDeletedApplicationViewEvent } from './app-health-deleted-application-view.event';
import { AppHealthDeletedApplicationViewsEvent } from './app-health-deleted-application-views.event';

export class AppHealthAddApplicationViewsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationView[] = [],
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
            new AppHealthCreatedApplicationViewsEvent(
                this.aggregateRoots.map(applicationView =>
                    new AppHealthCreatedApplicationViewEvent(
                        applicationView.id.value,
                        applicationView.applicationId.value,
                        applicationView.totalViews.value,
                        applicationView.complexity.value,
                        applicationView.description?.value,
                        applicationView.score.value,
                        applicationView.createdAt?.value,
                        applicationView.updatedAt?.value,
                        applicationView.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationViewsEvent(
                this.aggregateRoots.map(applicationView =>
                    new AppHealthUpdatedApplicationViewEvent(
                        applicationView.id.value,
                        applicationView.applicationId.value,
                        applicationView.totalViews.value,
                        applicationView.complexity.value,
                        applicationView.description?.value,
                        applicationView.score.value,
                        applicationView.createdAt?.value,
                        applicationView.updatedAt?.value,
                        applicationView.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationViewsEvent(
                this.aggregateRoots.map(applicationView =>
                    new AppHealthDeletedApplicationViewEvent(
                        applicationView.id.value,
                        applicationView.applicationId.value,
                        applicationView.totalViews.value,
                        applicationView.complexity.value,
                        applicationView.description?.value,
                        applicationView.score.value,
                        applicationView.createdAt?.value,
                        applicationView.updatedAt?.value,
                        applicationView.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
