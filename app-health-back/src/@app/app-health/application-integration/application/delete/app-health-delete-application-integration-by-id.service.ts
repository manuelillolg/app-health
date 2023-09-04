import { AppHealthIApplicationIntegrationRepository } from '@app/app-health/application-integration';
import { AppHealthApplicationIntegrationId } from '@app/app-health/application-integration/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationIntegrationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationIntegrationRepository,
    ) {}

    async main(
        id: AppHealthApplicationIntegrationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationIntegration = await this.repository
            .findById(
                id,
                {
                    constraint,
                    cQMetadata,
                },
            );

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository
            .deleteById(
                applicationIntegration.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationIntegrationRegister = this.publisher.mergeObjectContext(applicationIntegration);

        applicationIntegrationRegister.deleted(applicationIntegration); // apply event to model events
        applicationIntegrationRegister.commit(); // commit all events of model
    }
}
