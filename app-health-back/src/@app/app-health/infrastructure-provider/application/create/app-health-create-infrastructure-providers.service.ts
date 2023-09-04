import { AppHealthAddInfrastructureProvidersContextEvent, AppHealthIInfrastructureProviderRepository, AppHealthInfrastructureProvider } from '@app/app-health/infrastructure-provider';
import {
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderDeletedAt,
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderUpdatedAt,
} from '@app/app-health/infrastructure-provider/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateInfrastructureProvidersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        infrastructureProviders: {
            id: AppHealthInfrastructureProviderId;
            name: AppHealthInfrastructureProviderName;
            score: AppHealthInfrastructureProviderScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateInfrastructureProviders = infrastructureProviders.map(infrastructureProvider => AppHealthInfrastructureProvider.register(
            infrastructureProvider.id,
            infrastructureProvider.name,
            infrastructureProvider.score,
            new AppHealthInfrastructureProviderCreatedAt({ currentTimestamp: true }),
            new AppHealthInfrastructureProviderUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateInfrastructureProviders,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddInfrastructureProvidersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const infrastructureProvidersRegistered = this.publisher.mergeObjectContext(new AppHealthAddInfrastructureProvidersContextEvent(aggregateInfrastructureProviders));

        infrastructureProvidersRegistered.created(); // apply event to model events
        infrastructureProvidersRegistered.commit(); // commit all events of model
    }
}
