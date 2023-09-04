import { AppHealthIApplicationAuthenticationRepository } from '@app/app-health/application-authentication';
import { AppHealthApplicationAuthenticationId } from '@app/app-health/application-authentication/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteApplicationAuthenticationByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIApplicationAuthenticationRepository,
    ) {}

    async main(
        id: AppHealthApplicationAuthenticationId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const applicationAuthentication = await this.repository
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
                applicationAuthentication.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const applicationAuthenticationRegister = this.publisher.mergeObjectContext(applicationAuthentication);

        applicationAuthenticationRegister.deleted(applicationAuthentication); // apply event to model events
        applicationAuthenticationRegister.commit(); // commit all events of model
    }
}
