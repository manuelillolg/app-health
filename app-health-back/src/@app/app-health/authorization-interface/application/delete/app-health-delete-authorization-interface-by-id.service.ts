import { AppHealthIAuthorizationInterfaceRepository } from '@app/app-health/authorization-interface';
import { AppHealthAuthorizationInterfaceId } from '@app/app-health/authorization-interface/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class AppHealthDeleteAuthorizationInterfaceByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: AppHealthIAuthorizationInterfaceRepository,
    ) {}

    async main(
        id: AppHealthAuthorizationInterfaceId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get object to delete
        const authorizationInterface = await this.repository
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
                authorizationInterface.id,
                {
                    deleteOptions: cQMetadata?.repositoryOptions,
                    cQMetadata,
                },
            );

        // insert EventBus in object, to be able to apply and commit events
        const authorizationInterfaceRegister = this.publisher.mergeObjectContext(authorizationInterface);

        authorizationInterfaceRegister.deleted(authorizationInterface); // apply event to model events
        authorizationInterfaceRegister.commit(); // commit all events of model
    }
}
