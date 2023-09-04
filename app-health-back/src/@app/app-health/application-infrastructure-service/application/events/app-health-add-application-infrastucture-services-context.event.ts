import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthApplicationInfrastructureService } from '../../domain/app-health-application-infrastructure-service.aggregate';
import { AppHealthCreatedApplicationInfrastructureServiceEvent } from './app-health-created-application-infrastructure-service.event';
import { AppHealthCreatedApplicationInfrastuctureServicesEvent } from './app-health-created-application-infrastucture-services.event';
import { AppHealthUpdatedApplicationInfrastructureServiceEvent } from './app-health-updated-application-infrastructure-service.event';
import { AppHealthUpdatedApplicationInfrastuctureServicesEvent } from './app-health-updated-application-infrastucture-services.event';
import { AppHealthDeletedApplicationInfrastructureServiceEvent } from './app-health-deleted-application-infrastructure-service.event';
import { AppHealthDeletedApplicationInfrastuctureServicesEvent } from './app-health-deleted-application-infrastucture-services.event';

export class AppHealthAddApplicationInfrastuctureServicesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthApplicationInfrastructureService[] = [],
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
            new AppHealthCreatedApplicationInfrastuctureServicesEvent(
                this.aggregateRoots.map(applicationInfrastructureService =>
                    new AppHealthCreatedApplicationInfrastructureServiceEvent(
                        applicationInfrastructureService.id.value,
                        applicationInfrastructureService.applicationId.value,
                        applicationInfrastructureService.infrastructureServiceId.value,
                        applicationInfrastructureService.averageCostPerYear?.value,
                        applicationInfrastructureService.score.value,
                        applicationInfrastructureService.createdAt?.value,
                        applicationInfrastructureService.updatedAt?.value,
                        applicationInfrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedApplicationInfrastuctureServicesEvent(
                this.aggregateRoots.map(applicationInfrastructureService =>
                    new AppHealthUpdatedApplicationInfrastructureServiceEvent(
                        applicationInfrastructureService.id.value,
                        applicationInfrastructureService.applicationId.value,
                        applicationInfrastructureService.infrastructureServiceId.value,
                        applicationInfrastructureService.averageCostPerYear?.value,
                        applicationInfrastructureService.score.value,
                        applicationInfrastructureService.createdAt?.value,
                        applicationInfrastructureService.updatedAt?.value,
                        applicationInfrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedApplicationInfrastuctureServicesEvent(
                this.aggregateRoots.map(applicationInfrastructureService =>
                    new AppHealthDeletedApplicationInfrastructureServiceEvent(
                        applicationInfrastructureService.id.value,
                        applicationInfrastructureService.applicationId.value,
                        applicationInfrastructureService.infrastructureServiceId.value,
                        applicationInfrastructureService.averageCostPerYear?.value,
                        applicationInfrastructureService.score.value,
                        applicationInfrastructureService.createdAt?.value,
                        applicationInfrastructureService.updatedAt?.value,
                        applicationInfrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
