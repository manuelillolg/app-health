import { AppHealthAddInfrastructureServicesContextEvent, AppHealthIInfrastructureServiceRepository } from '@app/app-health/infrastructure-service';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteInfrastructureServicesService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureServiceRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const infrastructureServices = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (infrastructureServices.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInfrastructureServicesContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const infrastructureServicesRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddInfrastructureServicesContextEvent(infrastructureServices),
        );

        infrastructureServicesRegistered.deleted(); // apply event to model events
        infrastructureServicesRegistered.commit(); // commit all events of model
    }
}
