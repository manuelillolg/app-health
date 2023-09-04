import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';
import { AppHealthCreatedInfrastructureServiceEvent } from './app-health-created-infrastructure-service.event';
import { AppHealthCreatedInfrastructureServicesEvent } from './app-health-created-infrastructure-services.event';
import { AppHealthUpdatedInfrastructureServiceEvent } from './app-health-updated-infrastructure-service.event';
import { AppHealthUpdatedInfrastructureServicesEvent } from './app-health-updated-infrastructure-services.event';
import { AppHealthDeletedInfrastructureServiceEvent } from './app-health-deleted-infrastructure-service.event';
import { AppHealthDeletedInfrastructureServicesEvent } from './app-health-deleted-infrastructure-services.event';

export class AppHealthAddInfrastructureServicesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthInfrastructureService[] = [],
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
            new AppHealthCreatedInfrastructureServicesEvent(
                this.aggregateRoots.map(infrastructureService =>
                    new AppHealthCreatedInfrastructureServiceEvent(
                        infrastructureService.id.value,
                        infrastructureService.providerId.value,
                        infrastructureService.name.value,
                        infrastructureService.score.value,
                        infrastructureService.createdAt?.value,
                        infrastructureService.updatedAt?.value,
                        infrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedInfrastructureServicesEvent(
                this.aggregateRoots.map(infrastructureService =>
                    new AppHealthUpdatedInfrastructureServiceEvent(
                        infrastructureService.id.value,
                        infrastructureService.providerId.value,
                        infrastructureService.name.value,
                        infrastructureService.score.value,
                        infrastructureService.createdAt?.value,
                        infrastructureService.updatedAt?.value,
                        infrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedInfrastructureServicesEvent(
                this.aggregateRoots.map(infrastructureService =>
                    new AppHealthDeletedInfrastructureServiceEvent(
                        infrastructureService.id.value,
                        infrastructureService.providerId.value,
                        infrastructureService.name.value,
                        infrastructureService.score.value,
                        infrastructureService.createdAt?.value,
                        infrastructureService.updatedAt?.value,
                        infrastructureService.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
