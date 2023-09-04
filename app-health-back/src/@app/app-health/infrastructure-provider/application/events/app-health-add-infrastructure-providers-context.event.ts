import { AggregateRoot } from '@nestjs/cqrs';
import { AppHealthInfrastructureProvider } from '../../domain/app-health-infrastructure-provider.aggregate';
import { AppHealthCreatedInfrastructureProviderEvent } from './app-health-created-infrastructure-provider.event';
import { AppHealthCreatedInfrastructureProvidersEvent } from './app-health-created-infrastructure-providers.event';
import { AppHealthUpdatedInfrastructureProviderEvent } from './app-health-updated-infrastructure-provider.event';
import { AppHealthUpdatedInfrastructureProvidersEvent } from './app-health-updated-infrastructure-providers.event';
import { AppHealthDeletedInfrastructureProviderEvent } from './app-health-deleted-infrastructure-provider.event';
import { AppHealthDeletedInfrastructureProvidersEvent } from './app-health-deleted-infrastructure-providers.event';

export class AppHealthAddInfrastructureProvidersContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: AppHealthInfrastructureProvider[] = [],
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
            new AppHealthCreatedInfrastructureProvidersEvent(
                this.aggregateRoots.map(infrastructureProvider =>
                    new AppHealthCreatedInfrastructureProviderEvent(
                        infrastructureProvider.id.value,
                        infrastructureProvider.name.value,
                        infrastructureProvider.score.value,
                        infrastructureProvider.createdAt?.value,
                        infrastructureProvider.updatedAt?.value,
                        infrastructureProvider.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new AppHealthUpdatedInfrastructureProvidersEvent(
                this.aggregateRoots.map(infrastructureProvider =>
                    new AppHealthUpdatedInfrastructureProviderEvent(
                        infrastructureProvider.id.value,
                        infrastructureProvider.name.value,
                        infrastructureProvider.score.value,
                        infrastructureProvider.createdAt?.value,
                        infrastructureProvider.updatedAt?.value,
                        infrastructureProvider.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new AppHealthDeletedInfrastructureProvidersEvent(
                this.aggregateRoots.map(infrastructureProvider =>
                    new AppHealthDeletedInfrastructureProviderEvent(
                        infrastructureProvider.id.value,
                        infrastructureProvider.name.value,
                        infrastructureProvider.score.value,
                        infrastructureProvider.createdAt?.value,
                        infrastructureProvider.updatedAt?.value,
                        infrastructureProvider.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
