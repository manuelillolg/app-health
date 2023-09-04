import { AppHealthApplicationInfrastructureService, AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service';
import {
    AppHealthApplicationInfrastructureServiceApplicationId,
    AppHealthApplicationInfrastructureServiceAverageCostPerYear,
    AppHealthApplicationInfrastructureServiceCreatedAt,
    AppHealthApplicationInfrastructureServiceDeletedAt,
    AppHealthApplicationInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceInfrastructureServiceId,
    AppHealthApplicationInfrastructureServiceScore,
    AppHealthApplicationInfrastructureServiceUpdatedAt,
} from '@app/app-health/application-infrastructure-service/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthCreateApplicationInfrastructureServiceService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        payload: {
            id: AppHealthApplicationInfrastructureServiceId;
            applicationId: AppHealthApplicationInfrastructureServiceApplicationId;
            infrastructureServiceId: AppHealthApplicationInfrastructureServiceInfrastructureServiceId;
            averageCostPerYear: AppHealthApplicationInfrastructureServiceAverageCostPerYear;
            score: AppHealthApplicationInfrastructureServiceScore;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const applicationInfrastructureService = AppHealthApplicationInfrastructureService.register(
            payload.id,
            payload.applicationId,
            payload.infrastructureServiceId,
            payload.averageCostPerYear,
            payload.score,
            new AppHealthApplicationInfrastructureServiceCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(
            applicationInfrastructureService,
            {
                createOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const applicationInfrastructureServiceRegister = this.publisher.mergeObjectContext(
            applicationInfrastructureService,
        );

        applicationInfrastructureServiceRegister.created(applicationInfrastructureService); // apply event to model events
        applicationInfrastructureServiceRegister.commit(); // commit all events of model
    }
}
