import { AppHealthIInfrastructureProviderRepository, AppHealthInfrastructureProvider } from '@app/app-health/infrastructure-provider';
import {
    AppHealthInfrastructureProviderCreatedAt,
    AppHealthInfrastructureProviderDeletedAt,
    AppHealthInfrastructureProviderId,
    AppHealthInfrastructureProviderName,
    AppHealthInfrastructureProviderScore,
    AppHealthInfrastructureProviderUpdatedAt,
} from '@app/app-health/infrastructure-provider/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthUpdateInfrastructureProviderByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthInfrastructureProviderId;
            name?: AppHealthInfrastructureProviderName;
            score?: AppHealthInfrastructureProviderScore;
        },
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const infrastructureProvider = AppHealthInfrastructureProvider.register(
            payload.id,
            payload.name,
            payload.score,
            null, // createdAt
            new AppHealthInfrastructureProviderUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update by id
        await this.repository.updateById(
            infrastructureProvider,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const infrastructureProviderRegister = this.publisher.mergeObjectContext(
            infrastructureProvider,
        );

        infrastructureProviderRegister.updated(infrastructureProvider); // apply event to model events
        infrastructureProviderRegister.commit(); // commit all events of model
    }
}
