import { AppHealthAddApplicationIntegrationsContextEvent, AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationIntegrationsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const applicationIntegrations = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (applicationIntegrations.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddApplicationIntegrationsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const applicationIntegrationsRegistered = this.publisher.mergeObjectContext(
            new AppHealthAddApplicationIntegrationsContextEvent(applicationIntegrations),
        );

        applicationIntegrationsRegistered.deleted(); // apply event to model events
        applicationIntegrationsRegistered.commit(); // commit all events of model
    }
}
