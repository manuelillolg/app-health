import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import {
    AppHealthInfrastructureServiceId,
    AppHealthInfrastructureServiceProviderId,
    AppHealthInfrastructureServiceName,
    AppHealthInfrastructureServiceScore,
    AppHealthInfrastructureServiceCreatedAt,
    AppHealthInfrastructureServiceUpdatedAt,
    AppHealthInfrastructureServiceDeletedAt,
} from '../../domain/value-objects';
import { AppHealthIInfrastructureServiceRepository } from '../../domain/app-health-infrastructure-service.repository';
import { AppHealthInfrastructureService } from '../../domain/app-health-infrastructure-service.aggregate';
import { AppHealthAddInfrastructureServicesContextEvent } from '../events/app-health-add-infrastructure-services-context.event';

@Injectable()
export class AppHealthUpdateInfrastructureServicesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        payload: {
            id?: AppHealthInfrastructureServiceId;
            providerId?: AppHealthInfrastructureServiceProviderId;
            name?: AppHealthInfrastructureServiceName;
            score?: AppHealthInfrastructureServiceScore;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const infrastructureService = AppHealthInfrastructureService.register(
            payload.id,
            payload.providerId,
            payload.name,
            payload.score,
            null, // createdAt
            new AppHealthInfrastructureServiceUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(
            infrastructureService,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const infrastructureServices = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const infrastructureServicesRegister = this.publisher.mergeObjectContext(
            new AppHealthAddInfrastructureServicesContextEvent(infrastructureServices),
        );

        infrastructureServicesRegister.updated(); // apply event to model events
        infrastructureServicesRegister.commit(); // commit all events of model
    }
}
