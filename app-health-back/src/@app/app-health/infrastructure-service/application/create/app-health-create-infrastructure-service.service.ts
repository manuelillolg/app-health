import { AppHealthIInfrastructureServiceRepository, AppHealthInfrastructureService } from '@app/app-health/infrastructure-service';
import {
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceDeletedAt,
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceUpdatedAt,
} from '@app/app-health/infrastructure-service/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateInfrastructureServiceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthInfrastructureServiceId;
            providerId: AppHealthInfrastructureServiceProviderId;
            name: AppHealthInfrastructureServiceName;
            score: AppHealthInfrastructureServiceScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const infrastructureService = AppHealthInfrastructureService.register(
            payload.id,
            payload.providerId,
            payload.name,
            payload.score,
            new AppHealthInfrastructureServiceCreatedAt({ currentTimestamp: true }),
            new AppHealthInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            infrastructureService,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const infrastructureServiceRegister = this.publisher.mergeObjectContext(
            infrastructureService,
        );

        infrastructureServiceRegister.created(infrastructureService); // apply event to model events
        infrastructureServiceRegister.commit(); // commit all events of model
    }
}
