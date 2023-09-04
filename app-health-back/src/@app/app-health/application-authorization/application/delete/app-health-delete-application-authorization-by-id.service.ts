import { AppHealthIApplicationAuthorizationRepository } from '@app/app-health/application-authorization';
import { AppHealthApplicationAuthorizationId } from '@app/app-health/application-authorization/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationAuthorizationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthorizationRepository,
    ) {}

    async main(
        id: AppHealthApplicationAuthorizationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationAuthorization = await this.repository
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
                applicationAuthorization.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthorizationRegister = this.publisher.mergeObjectContext(applicationAuthorization);

        applicationAuthorizationRegister.deleted(applicationAuthorization); // apply event to model events
        applicationAuthorizationRegister.commit(); // commit all events of model
    }
}
