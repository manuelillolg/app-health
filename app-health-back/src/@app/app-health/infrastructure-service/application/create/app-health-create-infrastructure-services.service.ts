import { AppHealthAddInfrastructureServicesContextEvent, AppHealthIInfrastructureServiceRepository, AppHealthInfrastructureService } from '@app/app-health/infrastructure-service';
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
export class AppHealthCreateInfrastructureServicesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        infrastructureServices: {
            id: AppHealthInfrastructureServiceId;
            providerId: AppHealthInfrastructureServiceProviderId;
            name: AppHealthInfrastructureServiceName;
            score: AppHealthInfrastructureServiceScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateInfrastructureServices = infrastructureServices.map(infrastructureService => AppHealthInfrastructureService.register(
            infrastructureService.id,
            infrastructureService.providerId,
            infrastructureService.name,
            infrastructureService.score,
            new AppHealthInfrastructureServiceCreatedAt({ currentTimestamp: true }),
            new AppHealthInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateInfrastructureServices,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddInfrastructureServicesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const infrastructureServicesRegistered = this.publisher.mergeObjectContext(new AppHealthAddInfrastructureServicesContextEvent(aggregateInfrastructureServices));

        infrastructureServicesRegistered.created(); // apply event to model events
        infrastructureServicesRegistered.commit(); // commit all events of model
    }
}
