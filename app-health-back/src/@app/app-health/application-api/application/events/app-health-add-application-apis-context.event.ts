import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationApi } from '../../domain/app-health-application-api.aggregate';
import { AppHealthCreatedApplicationApiEvent } from './app-health-created-application-api.event';
import { AppHealthCreatedApplicationApisEvent } from './app-health-created-application-apis.event';
import { AppHealthUpdatedApplicationApiEvent } from './app-health-updated-application-api.event';
import { AppHealthUpdatedApplicationApisEvent } from './app-health-updated-application-apis.event';
import { AppHealthDeletedApplicationApiEvent } from './app-health-deleted-application-api.event';
import { AppHealthDeletedApplicationApisEvent } from './app-health-deleted-application-apis.event';

export class AppHealthAddApplicationApisContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationApi[] = [],
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
            new AppHealthCreatedApplicationApisEvent(
                this.aggregateRoots.map(applicationApi =>
                    new AppHealthCreatedApplicationApiEvent(
                        applicationApi.id.value,
                        applicationApi.applicationId.value,
                        applicationApi.apiInterfaceTypeId.value,
                        applicationApi.score.value,
                        applicationApi.documentations?.value,
                        applicationApi.requestsPerDay?.value,
                        applicationApi.applicationInfrastructureServiceId.value,
                        applicationApi.createdAt?.value,
                        applicationApi.updatedAt?.value,
                        applicationApi.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationApisEvent(
                this.aggregateRoots.map(applicationApi =>
                    new AppHealthUpdatedApplicationApiEvent(
                        applicationApi.id.value,
                        applicationApi.applicationId.value,
                        applicationApi.apiInterfaceTypeId.value,
                        applicationApi.score.value,
                        applicationApi.documentations?.value,
                        applicationApi.requestsPerDay?.value,
                        applicationApi.applicationInfrastructureServiceId.value,
                        applicationApi.createdAt?.value,
                        applicationApi.updatedAt?.value,
                        applicationApi.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationApisEvent(
                this.aggregateRoots.map(applicationApi =>
                    new AppHealthDeletedApplicationApiEvent(
                        applicationApi.id.value,
                        applicationApi.applicationId.value,
                        applicationApi.apiInterfaceTypeId.value,
                        applicationApi.score.value,
                        applicationApi.documentations?.value,
                        applicationApi.requestsPerDay?.value,
                        applicationApi.applicationInfrastructureServiceId.value,
                        applicationApi.createdAt?.value,
                        applicationApi.updatedAt?.value,
                        applicationApi.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
