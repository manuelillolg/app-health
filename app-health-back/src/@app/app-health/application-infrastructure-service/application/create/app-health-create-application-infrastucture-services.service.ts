import { AppHealthAddApplicationInfrastuctureServicesContextEvent, AppHealthApplicationInfrastructureService, AppHealthIApplicationInfrastructureServiceRepository } from '@app/app-health/application-infrastructure-service';
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
export class AppHealthCreateApplicationInfrastuctureServicesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationInfrastructureServiceRepository,
    ) {}

    async main(
        applicationInfrastuctureServices: {
            id: AppHealthApplicationInfrastructureServiceId;
            applicationId: AppHealthApplicationInfrastructureServiceApplicationId;
            infrastructureServiceId: AppHealthApplicationInfrastructureServiceInfrastructureServiceId;
            averageCostPerYear: AppHealthApplicationInfrastructureServiceAverageCostPerYear;
            score: AppHealthApplicationInfrastructureServiceScore;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateApplicationInfrastuctureServices = applicationInfrastuctureServices.map(applicationInfrastructureService => AppHealthApplicationInfrastructureService.register(
            applicationInfrastructureService.id,
            applicationInfrastructureService.applicationId,
            applicationInfrastructureService.infrastructureServiceId,
            applicationInfrastructureService.averageCostPerYear,
            applicationInfrastructureService.score,
            new AppHealthApplicationInfrastructureServiceCreatedAt({ currentTimestamp: true }),
            new AppHealthApplicationInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(
            aggregateApplicationInfrastuctureServices,
            {
                insertOptions: cQMetadata?.repositoryOptions,
            },
        );

        // create AddApplicationInfrastuctureServicesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationInfrastuctureServicesRegistered = this.publisher.mergeObjectContext(new AppHealthAddApplicationInfrastuctureServicesContextEvent(aggregateApplicationInfrastuctureServices));

        applicationInfrastuctureServicesRegistered.created(); // apply event to model events
        applicationInfrastuctureServicesRegistered.commit(); // commit all events of model
    }
}
