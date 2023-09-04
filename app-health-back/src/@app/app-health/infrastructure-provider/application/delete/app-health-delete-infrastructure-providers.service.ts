import { AppHealthAddInfrastructureProvidersContextEvent, AppHealthIInfrastructureProviderRepository } from '@app/app-health/infrastructure-provider';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteInfrastructureProvidersService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIInfrastructureProviderRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const infrastructureProviders = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (infrastructureProviders.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddInfrastructureProvidersContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const infrastructureProvidersRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddInfrastructureProvidersContextEvent(infrastructureProviders),
        );

        infrastructureProvidersRegistered.deleted(); // apply event to model events
        infrastructureProvidersRegistered.commit(); // commit all events of model
    }
}
